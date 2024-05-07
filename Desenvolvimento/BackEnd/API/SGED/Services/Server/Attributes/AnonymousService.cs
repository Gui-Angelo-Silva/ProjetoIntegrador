namespace SGED.Services.Server.Attributes

{
    // Definição do serviço que define o método http como Anonymous
    [AttributeUsage(AttributeTargets.Method)]
    public class AnonymousAttribute : Attribute { }
}
