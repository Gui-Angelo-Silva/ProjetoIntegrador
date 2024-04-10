using Jose;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;
using SGED.Helpers;
using Newtonsoft.Json;
using System.Reflection;
using Humanizer;

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
        public List<string> ObjetoDTO { get; set; }


        //[JsonIgnore]
        public UsuarioDTO? UsuarioDTO { get; set; }

        public int IdUsuario { get; set; }



        public void ConverttoStringList<T>(List<T> objetosDTO)
        {
            if (objetosDTO != null)
            {
                ObjetoDTO = objetosDTO.Select(dto => dto.ToString()).ToList();
            }
        }

        public List<T> ConverttoDTOList<T>()
        {
            // Verifica se a lista de strings e o tipo T não são nulos
            if (ObjetoDTO != null && !string.IsNullOrEmpty(TabelaAfetada))
            {
                // Monta o nome do tipo adicionando "DTO" ao final
                string typeObject = TabelaAfetada + "DTO";

                // Obtém o tipo com o nome construído
                Type dtoType = Type.GetType(typeObject);

                if (dtoType != null)
                {
                    // Converte as strings de ObjetoDTO para objetos do tipo T
                    return ObjetoDTO.Select(dtoString => (T)Convert.ChangeType(dtoString, dtoType)).ToList();
                }
                else
                {
                    throw new InvalidOperationException("Tipo de DTO não encontrado!");
                }
            }
            else
            {
                throw new InvalidOperationException("A lista de strings ou o nome da tabela está vazia!");
            }
        }

    }
}
