namespace SGED.Services.Server.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class OrderMethodAttribute : Attribute
    {
        public int Order { get; }

        public OrderMethodAttribute(int order)
        {
            Order = order;
        }
    }
}
