using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IInstalacaoRepository
{
    Task<IEnumerable<Instalacao>> GetAll();
    Task<Instalacao> GetById(int id);
    Task<Instalacao> Create(Instalacao instalacao);
    Task<Instalacao> Update(Instalacao instalacao);
    Task<Instalacao> Delete(int id);
}
