using SGED.Context;
using SGED.Repositories.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Entities;
using SGED.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Adicione servi�os ao container

builder.Services.AddControllers().AddJsonOptions(
        c => c.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
    );

// Configura��o do Swagger/OpenAPI: https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Configura��o do Swagger para receber o Token
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SGED", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"Enter 'Bearer' [space] your token",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    }
    );

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
                    new List<string> ()
                }
            }
    );
}
);


// String de conex�o com o banco de dados
var sqlConnection = builder.Configuration.GetConnectionString("DefaultConnection");

// Entity Framework: Cria��o das tabelas no banco de dados

// PostgreSQL

builder.Services.AddDbContext<AppDBContext>(options =>
    options.UseNpgsql(sqlConnection)
);


// MySQL
/*
builder.Services.AddDbContext<AppDBContext>(options =>
    options.UseMySQL(sqlConnection)
);
*/

// Garante que todos os assemblies do domain sejam injetados
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


// Inje��o de depend�ncias

// Deped�ncia: Estado
builder.Services.AddScoped<IEstadoRepository, EstadoRepository>();
builder.Services.AddScoped<IEstadoService, EstadoService>();

// Deped�ncia: TipoUsuario
builder.Services.AddScoped<ITipoUsuarioRepository, TipoUsuarioRepository>();
builder.Services.AddScoped<ITipoUsuarioService, TipoUsuarioService>();

// Deped�ncia: Cidade
builder.Services.AddScoped<ICidadeRepository, CidadeRepository>();
builder.Services.AddScoped<ICidadeService, CidadeService>();

// Deped�ncia: Pessoa
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ApiScope", policy =>
    {
        policy.RequireClaim("scope", "sged");
    });
}
    );


var app = builder.Build();

// Configurando o pipeline de solicita��o HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
