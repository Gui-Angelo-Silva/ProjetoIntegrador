namespace SGED.DTO.Entities
{
    [AttributeUsage(AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
    sealed class UniqueAttribute : Attribute
    {

    }

    public class Unique<String>
    {
        private HashSet<String> atributes = new HashSet<String>();

        public bool IsUnique(String dado)
        {
            return !atributes.Contains(dado);
        }

        public void Add(String dado)
        {
            if (IsUnique(dado))
            {
                atributes.Add(dado);
            }
            else
            {
                atributes.Remove(dado);
            }
        }

        public void Remove(String dado)
        {
            atributes.Remove(dado);
        }
    }
}
