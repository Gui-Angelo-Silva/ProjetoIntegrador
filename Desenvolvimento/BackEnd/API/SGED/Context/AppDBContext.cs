using SGED.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace SGED.Context;
public class AppDBContext : DbContext
{
	public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

	// Mapeamento Relacional dos Objetos no Bando de Dados
	public DbSet<Estado> Estado { get; set; }
	public DbSet<TipoUsuario> TipoUsuario { get; set; }
	public DbSet<Cidade> Cidade { get; set; }
    public DbSet<Bairro> Bairro { get; set; }
    //public DbSet<TipoProcesso> TipoProcesso { get; set; }
    public DbSet<Usuario> Usuario { get; set; }
	public DbSet<Municipe> Municipe { get; set; }
	public DbSet<TipoLogradouro> TipoLogradouro { get; set; }

	// Fluent API
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{

		// Builder: Estado
		modelBuilder.Entity<Estado>().HasKey(b => b.Id);
		modelBuilder.Entity<Estado>().Property(b => b.NomeEstado).HasMaxLength(50).IsRequired();
		modelBuilder.Entity<Estado>().Property(b => b.UfEstado).HasMaxLength(2).IsRequired();

		// Builder: TipoUsuario
		modelBuilder.Entity<TipoUsuario>().HasKey(b => b.Id);
		modelBuilder.Entity<TipoUsuario>().Property(b => b.NivelAcesso).HasMaxLength(1).IsRequired();
		modelBuilder.Entity<TipoUsuario>().Property(b => b.NomeTipoUsuario).HasMaxLength(20).IsRequired();
		modelBuilder.Entity<TipoUsuario>().Property(b => b.DescricaoTipoUsuario).HasMaxLength(300).IsRequired();

		// Builder: Cidade
		modelBuilder.Entity<Cidade>().HasKey(b => b.Id);
		modelBuilder.Entity<Cidade>().Property(b => b.NomeCidade).HasMaxLength(100).IsRequired();
		modelBuilder.Entity<Cidade>().HasOne(b => b.Estado).WithMany().HasForeignKey(b => b.IdEstado);

        // Builder: Bairro
        modelBuilder.Entity<Bairro>().HasKey(b => b.Id);
        modelBuilder.Entity<Bairro>().Property(b => b.NomeBairro).HasMaxLength(50).IsRequired();

        // Relacionamento: Estado -> Cidade
        modelBuilder.Entity<Estado>().HasMany(p => p.Cidades).WithOne(b => b.Estado).IsRequired().OnDelete(DeleteBehavior.Cascade);

        // Relacionamento: Cidade -> Bairro
        modelBuilder.Entity<Cidade>().HasMany(p => p.Bairros).WithOne(b => b.Cidade).IsRequired().OnDelete(DeleteBehavior.Cascade);

        // Builder: Usuario 
        modelBuilder.Entity<Usuario>().HasKey(b => b.Id);
		modelBuilder.Entity<Usuario>().Property(b => b.NomePessoa).HasMaxLength(70).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.EmailPessoa).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.SenhaUsuario).HasMaxLength(50).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.TelefonePessoa).HasMaxLength(15).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.CpfCNPJPessoa).HasMaxLength(18).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.RgIEPessoa).HasMaxLength(15).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.CargoUsuario).HasMaxLength(50).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.StatusUsuario).IsRequired();
		modelBuilder.Entity<Usuario>().HasOne(b => b.TipoUsuario).WithMany().HasForeignKey(b => b.IdTipoUsuario);

		// Relacionamento: TipoUsuario -> Usuario
		modelBuilder.Entity<TipoUsuario>().HasMany(p => p.Usuarios).WithOne(b => b.TipoUsuario).IsRequired().OnDelete(DeleteBehavior.Cascade);

		// Builder: Municipe
		modelBuilder.Entity<Municipe>().HasKey(b => b.Id);
		modelBuilder.Entity<Municipe>().Property(b => b.NomePessoa).HasMaxLength(70).IsRequired();
		modelBuilder.Entity<Municipe>().Property(b => b.EmailPessoa).IsRequired();
		modelBuilder.Entity<Municipe>().Property(b => b.TelefonePessoa).HasMaxLength(15).IsRequired();
		modelBuilder.Entity<Municipe>().Property(b => b.CpfCNPJPessoa).HasMaxLength(18).IsRequired();
		modelBuilder.Entity<Municipe>().Property(b => b.RgIEPessoa).HasMaxLength(15).IsRequired();

		// Builder: TipoLogradouro
		modelBuilder.Entity<TipoLogradouro>().HasKey(b => b.Id);
		modelBuilder.Entity<TipoLogradouro>().Property(b => b.CodigoInformativo).HasMaxLength(3).IsRequired();
		modelBuilder.Entity<TipoLogradouro>().Property(b => b.Descricao).HasMaxLength(35).IsRequired();

		// Inserções:
		modelBuilder.Entity<Estado>().HasData(
			new Estado { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" },
			new Estado { Id = 2, NomeEstado = "Alagoas", UfEstado = "AL" },
			new Estado { Id = 3, NomeEstado = "Amapá", UfEstado = "AP" },
			new Estado { Id = 4, NomeEstado = "Amazonas", UfEstado = "AM" },
			new Estado { Id = 5, NomeEstado = "Bahia", UfEstado = "BA" },
			new Estado { Id = 6, NomeEstado = "Ceará", UfEstado = "CE" },
			new Estado { Id = 7, NomeEstado = "Distrito Federal", UfEstado = "DF" },
			new Estado { Id = 8, NomeEstado = "Espírito Santo", UfEstado = "ES" },
			new Estado { Id = 9, NomeEstado = "Goiás", UfEstado = "GO" },
			new Estado { Id = 10, NomeEstado = "Maranhão", UfEstado = "MA" },
			new Estado { Id = 11, NomeEstado = "Mato Grosso", UfEstado = "MT" },
			new Estado { Id = 12, NomeEstado = "Mato Grosso do Sul", UfEstado = "MS" },
			new Estado { Id = 13, NomeEstado = "Minas Gerais", UfEstado = "MG" },
			new Estado { Id = 14, NomeEstado = "Pará", UfEstado = "PA" },
			new Estado { Id = 15, NomeEstado = "Paraíba", UfEstado = "PB" },
			new Estado { Id = 16, NomeEstado = "Paraná", UfEstado = "PR" },
			new Estado { Id = 17, NomeEstado = "Pernambuco", UfEstado = "PE" },
			new Estado { Id = 18, NomeEstado = "Piauí", UfEstado = "PI" },
			new Estado { Id = 19, NomeEstado = "Rio de Janeiro", UfEstado = "RJ" },
			new Estado { Id = 20, NomeEstado = "Rio Grande do Norte", UfEstado = "RN" },
			new Estado { Id = 21, NomeEstado = "Rio Grande do Sul", UfEstado = "RS" },
			new Estado { Id = 22, NomeEstado = "Rondônia", UfEstado = "RO" },
			new Estado { Id = 23, NomeEstado = "Roraima", UfEstado = "RR" },
			new Estado { Id = 24, NomeEstado = "Santa Catarina", UfEstado = "SC" },
			new Estado { Id = 25, NomeEstado = "Acre", UfEstado = "AC" },
			new Estado { Id = 26, NomeEstado = "Sergipe", UfEstado = "SE" },
			new Estado { Id = 27, NomeEstado = "Tocantins", UfEstado = "TO" }
		);

		modelBuilder.Entity<Cidade>().HasData(
			new Cidade { Id = 29, NomeCidade = "Aparecida d'Oeste", IdEstado = 1 },
			new Cidade { Id = 284, NomeCidade = "Jales", IdEstado = 1 },
			new Cidade { Id = 399, NomeCidade = "Palmeira d'Oeste", IdEstado = 1 },
			new Cidade { Id = 406, NomeCidade = "Paranapuã", IdEstado = 1 },
			new Cidade { Id = 502, NomeCidade = "Rubineia", IdEstado = 1 },
			new Cidade { Id = 518, NomeCidade = "Santa Clara d'Oeste", IdEstado = 1 },
			new Cidade { Id = 524, NomeCidade = "Santa Fé do Sul", IdEstado = 1 },
			new Cidade { Id = 550, NomeCidade = "São Francisco", IdEstado = 1 },
			new Cidade { Id = 552, NomeCidade = "São João das Duas Pontes", IdEstado = 1 },
			new Cidade { Id = 628, NomeCidade = "Urânia", IdEstado = 1 }
		);

		modelBuilder.Entity<TipoLogradouro>().HasData(
			new TipoLogradouro { Id = 1, CodigoInformativo = "A", Descricao = "Área" },
			new TipoLogradouro { Id = 2, CodigoInformativo = "AC", Descricao = "Acesso" },
			new TipoLogradouro { Id = 3, CodigoInformativo = "ACA", Descricao = "Acampamento" },
			new TipoLogradouro { Id = 4, CodigoInformativo = "ACL", Descricao = "Acesso Local"},
			new TipoLogradouro { Id = 5, CodigoInformativo = "AD", Descricao = "Adro"},
			new TipoLogradouro { Id = 6, CodigoInformativo = "AE", Descricao = "Área Especial"},
			new TipoLogradouro { Id = 7, CodigoInformativo = "AER", Descricao = "Aeroporto"},
			new TipoLogradouro { Id = 8, CodigoInformativo = "AL", Descricao = "Alameda"},
			new TipoLogradouro { Id = 9, CodigoInformativo = "AMD", Descricao = "Avenida Marginal Direita"},
			new TipoLogradouro { Id = 10, CodigoInformativo = "AME", Descricao = "Avenida Marginal Esquerda"},
			new TipoLogradouro { Id = 11, CodigoInformativo = "AN", Descricao = "Anel Viário"},
			new TipoLogradouro { Id = 12, CodigoInformativo = "ANT", Descricao = "Antiga Estrada"},
			new TipoLogradouro { Id = 13, CodigoInformativo = "ART", Descricao = "Artéria"},
			new TipoLogradouro { Id = 14, CodigoInformativo = "AT", Descricao = "Alto"},
			new TipoLogradouro { Id = 15, CodigoInformativo = "ATL", Descricao = "Atalho"},
			new TipoLogradouro { Id = 16, CodigoInformativo = "A V", Descricao = "Área Verde"},
			new TipoLogradouro { Id = 17, CodigoInformativo = "AV", Descricao = "Avenida"},
			new TipoLogradouro { Id = 18, CodigoInformativo = "AV", Descricao = "Avenida"},
			new TipoLogradouro { Id = 19, CodigoInformativo = "AVC", Descricao = "Avenida do Contorno"},
			new TipoLogradouro { Id = 20, CodigoInformativo = "AVM", Descricao = "Avenida Marginal"},
			new TipoLogradouro { Id = 21, CodigoInformativo = "AVV", Descricao = "Avenida Velha"},
			new TipoLogradouro { Id = 22, CodigoInformativo = "BAL", Descricao = "Balneário"},
			new TipoLogradouro { Id = 23, CodigoInformativo = "BC", Descricao = "Beco"},
			new TipoLogradouro { Id = 24, CodigoInformativo = "BCO", Descricao = "Buraco"},
			new TipoLogradouro { Id = 25, CodigoInformativo = "BEL", Descricao = "Belvedere"},
			new TipoLogradouro { Id = 26, CodigoInformativo = "BL", Descricao = "Bloco"},
			new TipoLogradouro { Id = 27, CodigoInformativo = "BLO", Descricao = "Balão"},
			new TipoLogradouro { Id = 28, CodigoInformativo = "BLS", Descricao = "Blocos"},
			new TipoLogradouro { Id = 29, CodigoInformativo = "BLV", Descricao = "Bulevar"},
			new TipoLogradouro { Id = 30, CodigoInformativo = "BSQ", Descricao = "Bosque"},
			new TipoLogradouro { Id = 31, CodigoInformativo = "BVD", Descricao = "Boulevard"},
			new TipoLogradouro { Id = 32, CodigoInformativo = "BX", Descricao = "Baixa"},
			new TipoLogradouro { Id = 33, CodigoInformativo = "C", Descricao = "Cais"},
			new TipoLogradouro { Id = 34, CodigoInformativo = "CAL", Descricao = "Calçada"},
			new TipoLogradouro { Id = 35, CodigoInformativo = "CAM", Descricao = "Caminho"},
			new TipoLogradouro { Id = 36, CodigoInformativo = "CAN", Descricao = "Canal"},
			new TipoLogradouro { Id = 37, CodigoInformativo = "CH", Descricao = "Chácara"},
			new TipoLogradouro { Id = 38, CodigoInformativo = "CHA", Descricao = "Chapadão"},
			new TipoLogradouro { Id = 39, CodigoInformativo = "CIC", Descricao = "Ciclovia"},
			new TipoLogradouro { Id = 40, CodigoInformativo = "CIR", Descricao = "Circular"},
			new TipoLogradouro { Id = 41, CodigoInformativo = "CJ", Descricao = "Conjunto"},
			new TipoLogradouro { Id = 42, CodigoInformativo = "CJM", Descricao = "Conjunto Multirão"},
			new TipoLogradouro { Id = 43, CodigoInformativo = "CMP", Descricao = "Complexo Viário"},
			new TipoLogradouro { Id = 44, CodigoInformativo = "COL", Descricao = "Colônia"},
			new TipoLogradouro { Id = 45, CodigoInformativo = "COM", Descricao = "Comunidade"},
			new TipoLogradouro { Id = 46, CodigoInformativo = "CON", Descricao = "Condomínio"},
			new TipoLogradouro { Id = 47, CodigoInformativo = "COR", Descricao = "Corredor"},
			new TipoLogradouro { Id = 48, CodigoInformativo = "CPO", Descricao = "Campo"},
			new TipoLogradouro { Id = 49, CodigoInformativo = "CRG", Descricao = "Córrego"},
			new TipoLogradouro { Id = 50, CodigoInformativo = "CTN", Descricao = "Contorno"},
			new TipoLogradouro { Id = 51, CodigoInformativo = "DSC", Descricao = "Descida"},
			new TipoLogradouro { Id = 52, CodigoInformativo = "DSV", Descricao = "Desvio"},
			new TipoLogradouro { Id = 53, CodigoInformativo = "DT", Descricao = "Distrito"},
			new TipoLogradouro { Id = 54, CodigoInformativo = "EB", Descricao = "Entre Bloco"},
			new TipoLogradouro { Id = 55, CodigoInformativo = "EIM", Descricao = "Estrada Intermunicipal"},
			new TipoLogradouro { Id = 56, CodigoInformativo = "ENS", Descricao = "Enseada"},
			new TipoLogradouro { Id = 57, CodigoInformativo = "ENT", Descricao = "Entrada Particular"},
			new TipoLogradouro { Id = 58, CodigoInformativo = "EQ", Descricao = "Entre Quadra"},
			new TipoLogradouro { Id = 59, CodigoInformativo = "ESC", Descricao = "Escada"},
			new TipoLogradouro { Id = 60, CodigoInformativo = "ESD", Descricao = "Escadaria"},
			new TipoLogradouro { Id = 61, CodigoInformativo = "ESE", Descricao = "Estrada Estadual"},
			new TipoLogradouro { Id = 62, CodigoInformativo = "ESI", Descricao = "Estrada Vicinal"},
			new TipoLogradouro { Id = 63, CodigoInformativo = "ESL", Descricao = "Estrada de Ligação"},
			new TipoLogradouro { Id = 64, CodigoInformativo = "ESM", Descricao = "Estrada Municipal"},
			new TipoLogradouro { Id = 65, CodigoInformativo = "ESP", Descricao = "Esplanada"},
			new TipoLogradouro { Id = 66, CodigoInformativo = "ESS", Descricao = "Estrada de Servidão"},
			new TipoLogradouro { Id = 67, CodigoInformativo = "EST", Descricao = "Estrada"},
			new TipoLogradouro { Id = 68, CodigoInformativo = "ESV", Descricao = "Estrada Velha"},
			new TipoLogradouro { Id = 69, CodigoInformativo = "ETA", Descricao = "Estrada Antiga"},
			new TipoLogradouro { Id = 70, CodigoInformativo = "ETC", Descricao = "Estação"},
			new TipoLogradouro { Id = 71, CodigoInformativo = "ETD", Descricao = "Estádio"},
			new TipoLogradouro { Id = 72, CodigoInformativo = "ETN", Descricao = "Estância"},
			new TipoLogradouro { Id = 73, CodigoInformativo = "ETP", Descricao = "Estrada Particular"},
			new TipoLogradouro { Id = 74, CodigoInformativo = "ETT", Descricao = "Estacionamento"},
			new TipoLogradouro { Id = 75, CodigoInformativo = "EVA", Descricao = "Evangélica"},
			new TipoLogradouro { Id = 76, CodigoInformativo = "EVD", Descricao = "Elevada"},
			new TipoLogradouro { Id = 77, CodigoInformativo = "EX", Descricao = "Eixo Industrial"},
			new TipoLogradouro { Id = 78, CodigoInformativo = "FAV", Descricao = "Favela"},
			new TipoLogradouro { Id = 79, CodigoInformativo = "FAZ", Descricao = "Fazenda"},
			new TipoLogradouro { Id = 80, CodigoInformativo = "FER", Descricao = "Ferrovia"},
			new TipoLogradouro { Id = 81, CodigoInformativo = "FNT", Descricao = "Fonte"},
			new TipoLogradouro { Id = 82, CodigoInformativo = "FRA", Descricao = "Feira"},
			new TipoLogradouro { Id = 83, CodigoInformativo = "FTE", Descricao = "Forte"},
			new TipoLogradouro { Id = 84, CodigoInformativo = "GAL", Descricao = "Galeria"},
			new TipoLogradouro { Id = 85, CodigoInformativo = "GJA", Descricao = "Granja"},
			new TipoLogradouro { Id = 86, CodigoInformativo = "HAB", Descricao = "Núcleo Habitacional"},
			new TipoLogradouro { Id = 87, CodigoInformativo = "IA", Descricao = "Ilha"},
			new TipoLogradouro { Id = 88, CodigoInformativo = "IND", Descricao = "Indeterminado"},
			new TipoLogradouro { Id = 89, CodigoInformativo = "IOA", Descricao = "Ilhota"},
			new TipoLogradouro { Id = 90, CodigoInformativo = "JD", Descricao = "Jardim"},
			new TipoLogradouro { Id = 91, CodigoInformativo = "JDE", Descricao = "Jardinete"},
			new TipoLogradouro { Id = 92, CodigoInformativo = "LD", Descricao = "Ladeira"},
			new TipoLogradouro { Id = 93, CodigoInformativo = "LGA", Descricao = "Lagoa"},
			new TipoLogradouro { Id = 94, CodigoInformativo = "LGO", Descricao = "Lago"},
			new TipoLogradouro { Id = 95, CodigoInformativo = "LOT", Descricao = "Loteamento"},
			new TipoLogradouro { Id = 96, CodigoInformativo = "LRG", Descricao = "Largo"},
			new TipoLogradouro { Id = 97, CodigoInformativo = "LT", Descricao = "Lote"},
			new TipoLogradouro { Id = 98, CodigoInformativo = "MER", Descricao = "Mercado"},
			new TipoLogradouro { Id = 99, CodigoInformativo = "MNA", Descricao = "Marina"},
			new TipoLogradouro { Id = 100, CodigoInformativo = "MOD", Descricao = "Modulo"},
			new TipoLogradouro { Id = 101, CodigoInformativo = "MRG", Descricao = "Projeção"},
			new TipoLogradouro { Id = 102, CodigoInformativo = "MRO", Descricao = "Morro"},
			new TipoLogradouro { Id = 103, CodigoInformativo = "MTE", Descricao = "Monte"},
			new TipoLogradouro { Id = 104, CodigoInformativo = "NUC", Descricao = "Núcleo"},
			new TipoLogradouro { Id = 105, CodigoInformativo = "NUR", Descricao = "Núcleo Rural"},
			new TipoLogradouro { Id = 106, CodigoInformativo = "OUT", Descricao = "Outeiro"},
			new TipoLogradouro { Id = 107, CodigoInformativo = "PAR", Descricao = "Paralela"},
			new TipoLogradouro { Id = 108, CodigoInformativo = "PAS", Descricao = "Passeio"},
			new TipoLogradouro { Id = 109, CodigoInformativo = "PAT", Descricao = "Pátio"},
			new TipoLogradouro { Id = 110, CodigoInformativo = "PC", Descricao = "Praça"},
			new TipoLogradouro { Id = 111, CodigoInformativo = "PCE", Descricao = "Praça de Esportes"},
			new TipoLogradouro { Id = 112, CodigoInformativo = "PDA", Descricao = "Parada"},
			new TipoLogradouro { Id = 113, CodigoInformativo = "PDO", Descricao = "Paradouro"},
			new TipoLogradouro { Id = 114, CodigoInformativo = "PNT", Descricao = "Ponta"},
			new TipoLogradouro { Id = 115, CodigoInformativo = "PR", Descricao = "Praia"},
			new TipoLogradouro { Id = 116, CodigoInformativo = "PRL", Descricao = "Prolongamento"},
			new TipoLogradouro { Id = 117, CodigoInformativo = "PRM", Descricao = "Parque Municipal"},
			new TipoLogradouro { Id = 118, CodigoInformativo = "PRQ", Descricao = "Parque"},
			new TipoLogradouro { Id = 119, CodigoInformativo = "PRR", Descricao = "Parque Residencial"},
			new TipoLogradouro { Id = 120, CodigoInformativo = "PSA", Descricao = "Passarela"},
			new TipoLogradouro { Id = 121, CodigoInformativo = "PSG", Descricao = "Passagem"},
			new TipoLogradouro { Id = 122, CodigoInformativo = "PSP", Descricao = "Passagem de Pedestre"},
			new TipoLogradouro { Id = 123, CodigoInformativo = "PSS", Descricao = "Passagem Subterrânea"},
			new TipoLogradouro { Id = 124, CodigoInformativo = "PTE", Descricao = "Ponte"},
			new TipoLogradouro { Id = 125, CodigoInformativo = "PTO", Descricao = "Porto"},
			new TipoLogradouro { Id = 126, CodigoInformativo = "Q", Descricao = "Quadra"},
			new TipoLogradouro { Id = 127, CodigoInformativo = "QTA", Descricao = "Quinta"},
			new TipoLogradouro { Id = 128, CodigoInformativo = "QTS", Descricao = "Quintas"},
			new TipoLogradouro { Id = 129, CodigoInformativo = "R", Descricao = "Rua"},
			new TipoLogradouro { Id = 130, CodigoInformativo = "R I", Descricao = "Rua Integração"},
			new TipoLogradouro { Id = 131, CodigoInformativo = "R L", Descricao = "Rua de Ligação"},
			new TipoLogradouro { Id = 132, CodigoInformativo = "R P", Descricao = "Rua Particular"},
			new TipoLogradouro { Id = 133, CodigoInformativo = "R V", Descricao = "Rua Velha"},
			new TipoLogradouro { Id = 134, CodigoInformativo = "RAM", Descricao = "Ramal"},
			new TipoLogradouro { Id = 135, CodigoInformativo = "RCR", Descricao = "Recreio"},
			new TipoLogradouro { Id = 136, CodigoInformativo = "REC", Descricao = "Recanto"},
			new TipoLogradouro { Id = 137, CodigoInformativo = "RER", Descricao = "Retiro"},
			new TipoLogradouro { Id = 138, CodigoInformativo = "RES", Descricao = "Residencial"},
			new TipoLogradouro { Id = 139, CodigoInformativo = "RET", Descricao = "Reta"},
			new TipoLogradouro { Id = 140, CodigoInformativo = "RLA", Descricao = "Ruela"},
			new TipoLogradouro { Id = 141, CodigoInformativo = "RMP", Descricao = "Rampa"},
			new TipoLogradouro { Id = 142, CodigoInformativo = "ROA", Descricao = "Rodo Anel"},
			new TipoLogradouro { Id = 143, CodigoInformativo = "ROD", Descricao = "Rodovia"},
			new TipoLogradouro { Id = 144, CodigoInformativo = "ROT", Descricao = "Rotula"},
			new TipoLogradouro { Id = 145, CodigoInformativo = "RPE", Descricao = "Rua de Pedestre"},
			new TipoLogradouro { Id = 146, CodigoInformativo = "RPR", Descricao = "Margem"},
			new TipoLogradouro { Id = 147, CodigoInformativo = "RTN", Descricao = "Retorno"},
			new TipoLogradouro { Id = 148, CodigoInformativo = "RTT", Descricao = "Rotatória"},
			new TipoLogradouro { Id = 149, CodigoInformativo = "SEG", Descricao = "Segunda Avenida"},
			new TipoLogradouro { Id = 150, CodigoInformativo = "SIT", Descricao = "Sitío"},
			new TipoLogradouro { Id = 151, CodigoInformativo = "SRV", Descricao = "Servidão"},
			new TipoLogradouro { Id = 152, CodigoInformativo = "ST", Descricao = "Setor"},
			new TipoLogradouro { Id = 153, CodigoInformativo = "SUB", Descricao = "Subida"},
			new TipoLogradouro { Id = 154, CodigoInformativo = "TCH", Descricao = "Trincheira"},
			new TipoLogradouro { Id = 155, CodigoInformativo = "TER", Descricao = "Terminal"},
			new TipoLogradouro { Id = 156, CodigoInformativo = "TR", Descricao = "Trecho"},
			new TipoLogradouro { Id = 157, CodigoInformativo = "TRV", Descricao = "Trevo"},
			new TipoLogradouro { Id = 158, CodigoInformativo = "TUN", Descricao = "Túnel"},
			new TipoLogradouro { Id = 159, CodigoInformativo = "TV", Descricao = "Travessa"},
			new TipoLogradouro { Id = 160, CodigoInformativo = "TVP", Descricao = "Travessa Particular"},
			new TipoLogradouro { Id = 161, CodigoInformativo = "TVV", Descricao = "Travessa Velha"},
			new TipoLogradouro { Id = 162, CodigoInformativo = "UNI", Descricao = "Unidade"},
			new TipoLogradouro { Id = 163, CodigoInformativo = "V", Descricao = "Via"},
			new TipoLogradouro { Id = 164, CodigoInformativo = "V C", Descricao = "Via Coletora"},
			new TipoLogradouro { Id = 165, CodigoInformativo = "V L", Descricao = "Via Local"},
			new TipoLogradouro { Id = 166, CodigoInformativo = "VAC", Descricao = "Via de Acesso"},
			new TipoLogradouro { Id = 167, CodigoInformativo = "VAL", Descricao = "Vala"},
			new TipoLogradouro { Id = 168, CodigoInformativo = "VCO", Descricao = "Vila Costeira"},
			new TipoLogradouro { Id = 169, CodigoInformativo = "VD", Descricao = "Viaduto"},
			new TipoLogradouro { Id = 170, CodigoInformativo = "V-E", Descricao = "Via Expressa"},
			new TipoLogradouro { Id = 171, CodigoInformativo = "VEV", Descricao = "Via Elevado"},
			new TipoLogradouro { Id = 173, CodigoInformativo = "VL", Descricao = "Vila"},
			new TipoLogradouro { Id = 174, CodigoInformativo = "VLA", Descricao = "Viela"},
			new TipoLogradouro { Id = 175, CodigoInformativo = "VLE", Descricao = "Vale"},
			new TipoLogradouro { Id = 176, CodigoInformativo = "VLT", Descricao = "Vila Litorânea"},
			new TipoLogradouro { Id = 177, CodigoInformativo = "VPE", Descricao = "Via de Pedestre"},
			new TipoLogradouro { Id = 178, CodigoInformativo = "VRT", Descricao = "Variante"},
			new TipoLogradouro { Id = 179, CodigoInformativo = "ZIG", Descricao = "Zigue-zague"}
		);

		modelBuilder.Entity<TipoUsuario>().HasData(
			new TipoUsuario { Id = 1, NomeTipoUsuario = "Desenvolvedor", NivelAcesso = "A", DescricaoTipoUsuario = "Entidade voltada ao time de desenvolvimento para uso da plataforma durante testes." },
			new TipoUsuario { Id = 2, NomeTipoUsuario = "Administrador", NivelAcesso = "A", DescricaoTipoUsuario = "Entidade administrativa do orgão da Secretária." },
			new TipoUsuario { Id = 3, NomeTipoUsuario = "Funcionário", NivelAcesso = "B", DescricaoTipoUsuario = "Entidade de suporte para a comunidade local." },
			new TipoUsuario { Id = 4, NomeTipoUsuario = "Jurídico", NivelAcesso = "C", DescricaoTipoUsuario = "Entidade que representa empresas, instituições ou qualquer entidade jurídica perante a lei." },
			new TipoUsuario { Id = 5, NomeTipoUsuario = "Físico", NivelAcesso = "D", DescricaoTipoUsuario = "Entidade que representa todos os munícipes da cidade." }
		);

		modelBuilder.Entity<Usuario>().HasData(
			new Usuario { Id = 1, NomePessoa = "Dev", EmailPessoa = "devops@development.com", SenhaUsuario = "123456", TelefonePessoa = "(00) 00000-0000", CpfCNPJPessoa = "000.000.000-00", RgIEPessoa = "00.000.000-0", CargoUsuario = "Desenvolvimento", StatusUsuario = true, IdTipoUsuario = 1 },
			new Usuario { Id = 2, NomePessoa = "Secretário Geral", EmailPessoa = "admin@gmail.com", SenhaUsuario = "987654", TelefonePessoa = "(00) 00000-0000", CpfCNPJPessoa = "000.000.000-00", RgIEPessoa = "00.000.000-0", CargoUsuario = "Secretário Geral", StatusUsuario = true, IdTipoUsuario = 2 }
		);
	}
}
