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

namespace SGED.Services.Server.Attributes

{
    // Definição do serviço que define o método http como Anonymous
    [AttributeUsage(AttributeTargets.Method)]
    public class AnonymousAttribute : Attribute { }
}
