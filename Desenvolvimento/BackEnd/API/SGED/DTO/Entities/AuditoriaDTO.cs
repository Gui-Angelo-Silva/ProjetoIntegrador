using Jose;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;
using SGED.Helpers;
using Newtonsoft.Json;

namespace SGED.DTO.Entities
{
    public class AuditoriaDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "A tabela afetada é requerida!")]
        public string TabelaAfetada { get; set; }

        [Required(ErrorMessage = "O registro afetado é requerido!")]
        public int RegistroAfetado { get; set; }

        [Required(ErrorMessage = "A ação realizada é requerida!")]
        public string AcaoRealizada { get; set; }

        [Required(ErrorMessage = "A dade e hora da ação é requerida!")]
        public string DataHoraAcao { get; set; }

        [Required(ErrorMessage = "O objeto da ação é requerido!")]
        public ICollection<UsuarioDTO>? ObjetoDTO { get; set; }

        public T Value
        {
            get
            {
                // Obter o tipo apropriado com base na tabela
                var type = typeof(T);
                var assembly = type.Assembly;
                var objectType = assembly.GetType(TabelaAfetada + "DTO");

                // Desserializar o valor para o tipo apropriado
                return (T)JsonConvert.DeserializeObject(_valueAsJson, objectType);
            }
            set
            {
                _valueAsJson = JsonConvert.SerializeObject(value);
            }
        }
        private string _valueAsJson;


        //[JsonIgnore]
        public UsuarioDTO? UsuarioDTO { get; set; }

        public int IdUsuario { get; set; }

    }
}
