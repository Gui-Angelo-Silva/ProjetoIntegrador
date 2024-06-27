using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IOcupacaoAtualRepository
{
    Task<IEnumerable<OcupacaoAtual>> GetAll();
    Task<OcupacaoAtual> GetById(int id);
    Task<OcupacaoAtual> Create(OcupacaoAtual ocupacaoatual);
    Task<OcupacaoAtual> Update(OcupacaoAtual ocupacaoatual);
    Task<OcupacaoAtual> Delete(int id);
}
