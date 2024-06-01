using SGED.Objects.Interfaces;

namespace SGED.Objects.Utilities
{
    public class Response
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
    }
}
