using SGED.Objects.Enums.Status;

namespace SGED.Objects.Utilities
{
    public class Response
    {
        public ResponseStatus Status { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public void SetSuccess()
        {
            this.Status = ResponseStatus.Success;
        }

        public void SetInvalid()
        {
            this.Status = ResponseStatus.Invalid;
        }

        public void SetNotFound()
        {
            this.Status = ResponseStatus.NotFound;
        }

        public void SetConflict()
        {
            this.Status = ResponseStatus.Conflict;
        }

        public void SetUnauthorized()
        {
            this.Status = ResponseStatus.Unauthorized;
        }

        public void SetError()
        {
            this.Status = ResponseStatus.Error;
        }
    }
}
