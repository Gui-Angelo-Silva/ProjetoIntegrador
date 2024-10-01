using System;

namespace SGED.Services.Server.Attributes
{
    [AttributeUsage(AttributeTargets.Method, Inherited = true)]
    public class AccessPermissionAttribute : Attribute
    {
        public string[] AllowedPermissions { get; }

        public AccessPermissionAttribute(params string[] allowedPermissions)
        {
            AllowedPermissions = allowedPermissions;
        }
    }
}
