using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IInstalacaoRepository
{
    Task<IEnumerable<InstalacaoModel>> GetAll();
    Task<InstalacaoModel> GetById(int id);
    Task<InstalacaoModel> Create(InstalacaoModel instalacao);
    Task<InstalacaoModel> Update(InstalacaoModel instalacao);
    Task<InstalacaoModel> Delete(int id);
}
