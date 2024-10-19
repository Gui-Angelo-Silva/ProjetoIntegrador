using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SGED.Context;
using SGED.Repositories.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Entities;
using SGED.Services.Interfaces;
using System.Text.Json.Serialization;
using System.Text;
using Swashbuckle.AspNetCore.SwaggerUI;
using SGED.Services.Server.Tasks;
using SGED.Objects.Utilities;
using SGED.Services.Server.Middleware;
using SGED.Services.Server.Attributes;
using SGED.Objects.Server;
using SGED.Objects.Models.Entities;
using SGED.Services.Server;

namespace SGED
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Busca a string de conexão
            var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL")
                                   ?? Configuration.GetConnectionString("DefaultConnection");

            // Configurando o DbContext com a string de conexão
            services.AddDbContext<AppDBContext>(options =>
                options.UseNpgsql(connectionString));

            // Configuração do Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SGED", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"Enter 'Bearer' [space] your token",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });
            });

            // Configuração da autenticação JWT
            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    SecurityEntity securityEntity = new SecurityEntity();
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = securityEntity.Issuer,
                        ValidAudience = securityEntity.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityEntity.Key)),
                    };
                });

            services.AddControllers().AddJsonOptions(
                c => c.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            services.AddEndpointsApiExplorer();

            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.WithOrigins("http://localhost:3000", "http://localhost:5173")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            }));

            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiScope", policy =>
                {
                    policy.RequireClaim("scope", "sged");
                });
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // Injeção de Dependências
            services.InjectDependencies();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Sua API V1");
                    // Adicione essas linhas para habilitar o botão "Authorize"
                    c.DocExpansion(DocExpansion.None);
                    c.DisplayRequestDuration();
                    c.EnableDeepLinking();
                    c.EnableFilter();
                    c.ShowExtensions();
                    c.EnableValidator();
                    c.SupportedSubmitMethods(SubmitMethod.Get, SubmitMethod.Post, SubmitMethod.Put, SubmitMethod.Delete);
                    c.OAuthClientId("swagger-ui");
                    c.OAuthAppName("Swagger UI");
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors("MyPolicy");

            app.UseWhen(context => context.Request.Path.StartsWithSegments("/api") && context.GetEndpoint()?.Metadata.GetMetadata<AnonymousAttribute>() == null,
            appBuilder =>
            {
                // Middleware de limpeza
                appBuilder.UseCleanupContextMiddleware();

                // Middleware de validação de sessão
                appBuilder.UseValidateSessionMiddleware();

                // Middleware de auditoria
                appBuilder.UseAuditMiddleware();

                // Verificação de resposta Unauthorized
                appBuilder.Use(async (context, next) =>
                {
                    if (context.Response.StatusCode == StatusCodes.Status401Unauthorized) return;
                    await next(context);
                });

                // Middleware de validação de acesso
                appBuilder.UseValidateAccessMiddleware();

                // Verificação de resposta Unauthorized
                appBuilder.Use(async (context, next) =>
                {
                    if (context.Response.StatusCode == StatusCodes.Status403Forbidden) return;
                    await next(context);
                });

                // Middleware para Endpoint inexistente
                appBuilder.UseNotFoundMiddleware();

                // Verificação de resposta Unauthorized
                appBuilder.Use(async (context, next) =>
                {
                    if (context.Response.StatusCode == StatusCodes.Status404NotFound) return;
                    await next(context);
                });
            });


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}