using SGED.Context;
using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SGED.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using SGED.Models.Entities;
using MySqlX.XDevAPI;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using Microsoft.AspNetCore.Mvc.Controllers;
using System.Reflection;

namespace SGED.Services.Server.Filter
{
    public class ExtractFilterMiddleware
    {
        private readonly RequestDelegate _next;

        public ExtractFilterMiddleware(RequestDelegate next)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        public async Task Invoke(HttpContext context)
        {
            // Verifica se o corpo da solicitação contém dados JSON
            if (context.Request.ContentType != null && context.Request.ContentType.ToLower().Contains("application/json"))
            {
                // Lê o corpo da solicitação como uma string
                string requestBody;
                using (var streamReader = new StreamReader(context.Request.Body, Encoding.UTF8))
                {
                    requestBody = await streamReader.ReadToEndAsync();
                }

                // Converte a string do corpo da solicitação em objeto JSON
                dynamic jsonData = JsonConvert.DeserializeObject(requestBody);

                // Verifica se o campo "object" existe no JSON recebido
                // Verifica se o campo "object" existe no JSON recebido
                if (jsonData != null && jsonData["object"] != null)
                {
                    // Se o método HTTP da solicitação foi identificado
                    if (!string.IsNullOrEmpty(context.Request.Method))
                    {
                        // Obtém informações sobre o método a ser invocado
                        MethodInfo methodInfo = _next.GetMethodInfo();
                        ParameterInfo[] parameters = methodInfo.GetParameters();
                        object[] arguments = new object[parameters.Length];

                        // Preenche todos os parâmetros do método com os dados do objeto JSON
                        for (int i = 0; i < parameters.Length; i++)
                        {
                            arguments[i] = jsonData["object"];
                        }

                        // Invoca o próximo delegado com os argumentos preenchidos
                        await _next(context);
                    }
                    else
                    {
                        // Se o método HTTP não foi identificado, retorna "Negado"
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        context.Response.ContentType = "application/json";
                        var response = new { statusRequest = "Erro: Não foi possível identificar o método da solicitado!" };
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
                        return;
                    }
                }
                else
                {
                    // Se "object" não existir, retorna "Negado"
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/json";
                    var response = new { statusRequest = "Erro: Não foi informado os dados na requisição!" };
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
                    return;
                }
            }
            else
            {
                // Se o corpo da solicitação não for JSON, retorna "Negado"
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";
                var response = new { statusRequest = "Erro: Formato de dados inválido!" };
                await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
                return;
            }
        }
    }
}
