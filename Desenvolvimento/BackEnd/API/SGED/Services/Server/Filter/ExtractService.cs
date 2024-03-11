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

namespace SGED.Services.Server.Filter
{
    public class ExtractFilterService
    {
        private readonly RequestDelegate _next;

        public ExtractFilterService(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Verificar se a solicitação tem corpo
            if (context.Request.HasJsonContentType() && context.Request.ContentLength > 0)
            {
                // Lendo o corpo da solicitação
                string requestBody;
                using (var reader = new StreamReader(context.Request.Body, Encoding.UTF8))
                {
                    requestBody = await reader.ReadToEndAsync();

                    // Definindo o ponteiro do stream novamente para o início
                    context.Request.Body.Position = 0;
                }

                // Convertendo o corpo da solicitação para um objeto JSON
                var requestJson = JsonConvert.DeserializeObject<Dictionary<string, object>>(requestBody);

                // Buscar o objeto marcado como "object"
                if (requestJson.TryGetValue("object", out object obj))
                {
                    // Aqui você tem o objeto "object"
                    var requestData = obj;

                    // Identificar o controlador e a ação atual
                    var routeData = context.GetRouteData();
                    var controllerName = routeData.Values["controller"]?.ToString();
                    var actionName = routeData.Values["action"]?.ToString();

                    // Verificar se controlador e ação foram identificados
                    if (!string.IsNullOrEmpty(controllerName) && !string.IsNullOrEmpty(actionName))
                    {
                        // Obter o método correspondente no controlador atual
                        var controllerType = Type.GetType($"SeuNamespace.{controllerName}Controller");
                        var methodInfo = controllerType.GetMethod(actionName);

                        // Verificar se o método foi encontrado
                        if (methodInfo != null)
                        {
                            // Obter parâmetros do método
                            var parameters = methodInfo.GetParameters();

                            // Verificar se há um parâmetro que corresponda ao tipo do objeto
                            var parameterType = parameters.FirstOrDefault()?.ParameterType;
                            if (parameterType != null && parameterType.IsAssignableFrom(requestData.GetType()))
                            {
                                // Criar uma instância do controlador
                                var controllerInstance = Activator.CreateInstance(controllerType);

                                // Invocar o método com o objeto como parâmetro
                                methodInfo.Invoke(controllerInstance, new object[] { requestData });
                            }
                        }
                    }
                }
            }

            // Chamar o próximo middleware no pipeline
            await _next(context);
        }
    }
}
