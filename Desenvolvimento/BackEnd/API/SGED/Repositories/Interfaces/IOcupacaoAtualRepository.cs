using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IOcupacaoAtualRepository
{
    Task<IEnumerable<OcupacaoAtualModel>> GetAll();
    Task<OcupacaoAtualModel> GetById(int id);
    Task<OcupacaoAtualModel> Create(OcupacaoAtualModel ocupacaoatual);
    Task<OcupacaoAtualModel> Update(OcupacaoAtualModel ocupacaoatual);
    Task<OcupacaoAtualModel> Delete(int id);
}
