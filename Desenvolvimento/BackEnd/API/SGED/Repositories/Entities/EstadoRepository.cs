using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace SGED.Repositories.Entities;
public class EstadoRepository : IEstadoRepository
{

    private readonly AppDBContext _dbContext;
    private readonly IConfiguration _configuration;

    public EstadoRepository(AppDBContext dbContext, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _configuration = configuration;
    }

    public async Task<IEnumerable<Estado>> GetAll()
    {
        return await _dbContext.Estado.ToListAsync();
    }

    public async Task<Estado> GetById(int id)
    {
        return await _dbContext.Estado.Where(p => p.Id == id).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Estado>> GetByNome(string nomeEstado)
    {
        List<Estado> estados = new List<Estado>();

        string connectionString = _configuration.GetConnectionString("ConnectionStrings");

        using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
        {
            connection.Open();

            // Construir a consulta SQL com o parâmetro nome
            string sql = "SELECT * FROM estado WHERE nomeestado ILIKE @nomeEstado";

            using (NpgsqlCommand command = new NpgsqlCommand(sql, connection))
            {
                command.Parameters.AddWithValue("@nomeEstado", "%" + nomeEstado + "%");

                using (NpgsqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Estado estado = new Estado
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            NomeEstado = reader.GetString(reader.GetOrdinal("nomeestado")),
                            UfEstado = reader.GetString(reader.GetOrdinal("ufestado"))
                        };

                        estados.Add(estado);
                    }
                }
            }
        }
        return estados;
    }

    public async Task<Estado> Create(Estado estado)
    {
        _dbContext.Estado.Add(estado);
        await _dbContext.SaveChangesAsync();
        return estado;
    }

    public async Task<Estado> Update(Estado estado)
    {
        _dbContext.Entry(estado).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return estado;
    }

    public async Task<Estado> Delete(int id)
    {
        var estado = await GetById(id);
        _dbContext.Estado.Remove(estado);
        await _dbContext.SaveChangesAsync();
        return estado;
    }
}
