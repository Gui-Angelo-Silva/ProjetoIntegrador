using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SGED.Context;
using SGED.Repositories.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Entities;
using SGED.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.Text;
using Swashbuckle.AspNetCore.SwaggerUI;
using SGED.Helpers;
using SGED.Services.Server.Tasks;
using Microsoft.AspNetCore.Authorization;

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
            // Configuração do banco de dados
            services.AddDbContext<AppDBContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

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

            // Injeção de dependências

            // Conjunto: Pessoa

            // Dependência: Municipe
            services.AddScoped<IMunicipeRepository, MunicipeRepository>();
            services.AddScoped<IMunicipeService, MunicipeService>();

            // Dependência: Fiscal
            services.AddScoped<IFiscalRepository, FiscalRepository>();
            services.AddScoped<IFiscalService, FiscalService>();

            // Dependência: Engenheiro
            services.AddScoped<IEngenheiroRepository, EngenheiroRepository>();
            services.AddScoped<IEngenheiroService, EngenheiroService>();

            // Dependência: TipoUsuário
            services.AddScoped<ITipoUsuarioRepository, TipoUsuarioRepository>();
            services.AddScoped<ITipoUsuarioService, TipoUsuarioService>();

            // Dependência: Usuário
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IUsuarioService, UsuarioService>();

            // Dependência: Sessão
            services.AddScoped<ISessaoRepository, SessaoRepository>();
            services.AddScoped<ISessaoService, SessaoService>();


            // Conjunto: Imóvel

            // Dependência: Estado
            services.AddScoped<IEstadoRepository, EstadoRepository>();
            services.AddScoped<IEstadoService, EstadoService>();

            // Dependência: Cidade
            services.AddScoped<ICidadeRepository, CidadeRepository>();
            services.AddScoped<ICidadeService, CidadeService>();

            // Dependência: Bairro
            services.AddScoped<IBairroRepository, BairroRepository>();
            services.AddScoped<IBairroService, BairroService>();

            // Dependência: TipoLogradouro
            services.AddScoped<ITipoLogradouroRepository, TipoLogradouroRepository>();
            services.AddScoped<ITipoLogradouroService, TipoLogradouroService>();

            // Dependência: Logradouro
            services.AddScoped<ILogradouroRepository, LogradouroRepository>();
            services.AddScoped<ILogradouroService, LogradouroService>();

            // Dependência: Imóvel
            services.AddScoped<IImovelRepository, ImovelRepository>();
            services.AddScoped<IImovelService, ImovelService>();


            // Conjunto: Processo

            // Dependência: TipoProcesso
            services.AddScoped<ITipoProcessoRepository, TipoProcessoRepository>();
            services.AddScoped<ITipoProcessoService, TipoProcessoService>();

            // Dependência: Etapa
            services.AddScoped<IEtapaRepository, EtapaRepository>();
            services.AddScoped<IEtapaService, EtapaService>();

            // Dependência: TipoDocumento
            services.AddScoped<ITipoDocumentoRepository, TipoDocumentoRepository>();
            services.AddScoped<ITipoDocumentoService, TipoDocumentoService>();


            // Conjunto: Servidor

            // Tasks
            services.AddHostedService<SessionCleanupService>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ValidateSessionService>();
            app.UseMiddleware<AuthorizationMiddleware>();

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

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}