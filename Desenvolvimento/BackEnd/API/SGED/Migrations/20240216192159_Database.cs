using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SGED.Migrations
{
    /// <inheritdoc />
    public partial class Database : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "estado",
                columns: table => new
                {
                    idestado = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomeestado = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ufestado = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_estado", x => x.idestado);
                });

            migrationBuilder.CreateTable(
                name: "municipe",
                columns: table => new
                {
                    idmunicipe = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    imagempessoa = table.Column<string>(type: "text", nullable: false),
                    nomepessoa = table.Column<string>(type: "character varying(70)", maxLength: 70, nullable: false),
                    emailpessoa = table.Column<string>(type: "text", nullable: false),
                    telefonepessoa = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    cpfcnpjpessoa = table.Column<string>(type: "character varying(18)", maxLength: 18, nullable: false),
                    rgiepessoa = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_municipe", x => x.idmunicipe);
                });

            migrationBuilder.CreateTable(
                name: "TipoDocumento",
                columns: table => new
                {
                    idTipoDocumento = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomeTipoDocumento = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    descricaoTipoDocumento = table.Column<string>(type: "character varying(450)", maxLength: 450, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoDocumento", x => x.idTipoDocumento);
                });

            migrationBuilder.CreateTable(
                name: "tipologradouro",
                columns: table => new
                {
                    idtipologradouro = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    codigoinformativo = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    descricaotipologradouro = table.Column<string>(type: "character varying(35)", maxLength: 35, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipologradouro", x => x.idtipologradouro);
                });

            migrationBuilder.CreateTable(
                name: "tipoprocesso",
                columns: table => new
                {
                    idtipoprocesso = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tipoprocesso = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    descricaotipoprocesso = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipoprocesso", x => x.idtipoprocesso);
                });

            migrationBuilder.CreateTable(
                name: "tipousuario",
                columns: table => new
                {
                    idtipousuario = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nivelacesso = table.Column<string>(type: "character varying(1)", maxLength: 1, nullable: false),
                    nometipousuario = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    descricaotipousuario = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipousuario", x => x.idtipousuario);
                });

            migrationBuilder.CreateTable(
                name: "cidade",
                columns: table => new
                {
                    idcidade = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cidade = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    IdEstado = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cidade", x => x.idcidade);
                    table.ForeignKey(
                        name: "FK_cidade_estado_IdEstado",
                        column: x => x.IdEstado,
                        principalTable: "estado",
                        principalColumn: "idestado",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "etapa",
                columns: table => new
                {
                    idetapa = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomeetapa = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    descricaoetapa = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    IdTipoProcesso = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_etapa", x => x.idetapa);
                    table.ForeignKey(
                        name: "FK_etapa_tipoprocesso_IdTipoProcesso",
                        column: x => x.IdTipoProcesso,
                        principalTable: "tipoprocesso",
                        principalColumn: "idtipoprocesso",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    idusuario = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    senhausuario = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    cargousuario = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    statususuario = table.Column<bool>(type: "boolean", nullable: false),
                    IdTipoUsuario = table.Column<int>(type: "integer", nullable: false),
                    imagempessoa = table.Column<string>(type: "text", nullable: false),
                    nomepessoa = table.Column<string>(type: "character varying(70)", maxLength: 70, nullable: false),
                    emailpessoa = table.Column<string>(type: "text", nullable: false),
                    telefonepessoa = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    cpfcnpjpessoa = table.Column<string>(type: "character varying(18)", maxLength: 18, nullable: false),
                    rgiepessoa = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuario", x => x.idusuario);
                    table.ForeignKey(
                        name: "FK_usuario_tipousuario_IdTipoUsuario",
                        column: x => x.IdTipoUsuario,
                        principalTable: "tipousuario",
                        principalColumn: "idtipousuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "bairro",
                columns: table => new
                {
                    idbairro = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    bairro = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IdCidade = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bairro", x => x.idbairro);
                    table.ForeignKey(
                        name: "FK_bairro_cidade_IdCidade",
                        column: x => x.IdCidade,
                        principalTable: "cidade",
                        principalColumn: "idcidade",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "logradouro",
                columns: table => new
                {
                    idlogradouro = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ceplogradouro = table.Column<string>(type: "character varying(9)", maxLength: 9, nullable: false),
                    numeroInicial = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    numeroFinal = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    IdBairro = table.Column<int>(type: "integer", nullable: false),
                    IdTipoLogradouro = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_logradouro", x => x.idlogradouro);
                    table.ForeignKey(
                        name: "FK_logradouro_bairro_IdBairro",
                        column: x => x.IdBairro,
                        principalTable: "bairro",
                        principalColumn: "idbairro",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_logradouro_tipologradouro_IdTipoLogradouro",
                        column: x => x.IdTipoLogradouro,
                        principalTable: "tipologradouro",
                        principalColumn: "idtipologradouro",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "estado",
                columns: new[] { "idestado", "nomeestado", "ufestado" },
                values: new object[,]
                {
                    { 1, "São Paulo", "SP" },
                    { 2, "Alagoas", "AL" },
                    { 3, "Amapá", "AP" },
                    { 4, "Amazonas", "AM" },
                    { 5, "Bahia", "BA" },
                    { 6, "Ceará", "CE" },
                    { 7, "Distrito Federal", "DF" },
                    { 8, "Espírito Santo", "ES" },
                    { 9, "Goiás", "GO" },
                    { 10, "Maranhão", "MA" },
                    { 11, "Mato Grosso", "MT" },
                    { 12, "Mato Grosso do Sul", "MS" },
                    { 13, "Minas Gerais", "MG" },
                    { 14, "Pará", "PA" },
                    { 15, "Paraíba", "PB" },
                    { 16, "Paraná", "PR" },
                    { 17, "Pernambuco", "PE" },
                    { 18, "Piauí", "PI" },
                    { 19, "Rio de Janeiro", "RJ" },
                    { 20, "Rio Grande do Norte", "RN" },
                    { 21, "Rio Grande do Sul", "RS" },
                    { 22, "Rondônia", "RO" },
                    { 23, "Roraima", "RR" },
                    { 24, "Santa Catarina", "SC" },
                    { 25, "Acre", "AC" },
                    { 26, "Sergipe", "SE" },
                    { 27, "Tocantins", "TO" }
                });

            migrationBuilder.InsertData(
                table: "tipologradouro",
                columns: new[] { "idtipologradouro", "codigoinformativo", "descricaotipologradouro" },
                values: new object[,]
                {
                    { 1, "A", "Área" },
                    { 2, "AC", "Acesso" },
                    { 3, "ACA", "Acampamento" },
                    { 4, "ACL", "Acesso Local" },
                    { 5, "AD", "Adro" },
                    { 6, "AE", "Área Especial" },
                    { 7, "AER", "Aeroporto" },
                    { 8, "AL", "Alameda" },
                    { 9, "AMD", "Avenida Marginal Direita" },
                    { 10, "AME", "Avenida Marginal Esquerda" },
                    { 11, "AN", "Anel Viário" },
                    { 12, "ANT", "Antiga Estrada" },
                    { 13, "ART", "Artéria" },
                    { 14, "AT", "Alto" },
                    { 15, "ATL", "Atalho" },
                    { 16, "A V", "Área Verde" },
                    { 17, "AV", "Avenida" },
                    { 18, "AV", "Avenida" },
                    { 19, "AVC", "Avenida do Contorno" },
                    { 20, "AVM", "Avenida Marginal" },
                    { 21, "AVV", "Avenida Velha" },
                    { 22, "BAL", "Balneário" },
                    { 23, "BC", "Beco" },
                    { 24, "BCO", "Buraco" },
                    { 25, "BEL", "Belvedere" },
                    { 26, "BL", "Bloco" },
                    { 27, "BLO", "Balão" },
                    { 28, "BLS", "Blocos" },
                    { 29, "BLV", "Bulevar" },
                    { 30, "BSQ", "Bosque" },
                    { 31, "BVD", "Boulevard" },
                    { 32, "BX", "Baixa" },
                    { 33, "C", "Cais" },
                    { 34, "CAL", "Calçada" },
                    { 35, "CAM", "Caminho" },
                    { 36, "CAN", "Canal" },
                    { 37, "CH", "Chácara" },
                    { 38, "CHA", "Chapadão" },
                    { 39, "CIC", "Ciclovia" },
                    { 40, "CIR", "Circular" },
                    { 41, "CJ", "Conjunto" },
                    { 42, "CJM", "Conjunto Multirão" },
                    { 43, "CMP", "Complexo Viário" },
                    { 44, "COL", "Colônia" },
                    { 45, "COM", "Comunidade" },
                    { 46, "CON", "Condomínio" },
                    { 47, "COR", "Corredor" },
                    { 48, "CPO", "Campo" },
                    { 49, "CRG", "Córrego" },
                    { 50, "CTN", "Contorno" },
                    { 51, "DSC", "Descida" },
                    { 52, "DSV", "Desvio" },
                    { 53, "DT", "Distrito" },
                    { 54, "EB", "Entre Bloco" },
                    { 55, "EIM", "Estrada Intermunicipal" },
                    { 56, "ENS", "Enseada" },
                    { 57, "ENT", "Entrada Particular" },
                    { 58, "EQ", "Entre Quadra" },
                    { 59, "ESC", "Escada" },
                    { 60, "ESD", "Escadaria" },
                    { 61, "ESE", "Estrada Estadual" },
                    { 62, "ESI", "Estrada Vicinal" },
                    { 63, "ESL", "Estrada de Ligação" },
                    { 64, "ESM", "Estrada Municipal" },
                    { 65, "ESP", "Esplanada" },
                    { 66, "ESS", "Estrada de Servidão" },
                    { 67, "EST", "Estrada" },
                    { 68, "ESV", "Estrada Velha" },
                    { 69, "ETA", "Estrada Antiga" },
                    { 70, "ETC", "Estação" },
                    { 71, "ETD", "Estádio" },
                    { 72, "ETN", "Estância" },
                    { 73, "ETP", "Estrada Particular" },
                    { 74, "ETT", "Estacionamento" },
                    { 75, "EVA", "Evangélica" },
                    { 76, "EVD", "Elevada" },
                    { 77, "EX", "Eixo Industrial" },
                    { 78, "FAV", "Favela" },
                    { 79, "FAZ", "Fazenda" },
                    { 80, "FER", "Ferrovia" },
                    { 81, "FNT", "Fonte" },
                    { 82, "FRA", "Feira" },
                    { 83, "FTE", "Forte" },
                    { 84, "GAL", "Galeria" },
                    { 85, "GJA", "Granja" },
                    { 86, "HAB", "Núcleo Habitacional" },
                    { 87, "IA", "Ilha" },
                    { 88, "IND", "Indeterminado" },
                    { 89, "IOA", "Ilhota" },
                    { 90, "JD", "Jardim" },
                    { 91, "JDE", "Jardinete" },
                    { 92, "LD", "Ladeira" },
                    { 93, "LGA", "Lagoa" },
                    { 94, "LGO", "Lago" },
                    { 95, "LOT", "Loteamento" },
                    { 96, "LRG", "Largo" },
                    { 97, "LT", "Lote" },
                    { 98, "MER", "Mercado" },
                    { 99, "MNA", "Marina" },
                    { 100, "MOD", "Modulo" },
                    { 101, "MRG", "Projeção" },
                    { 102, "MRO", "Morro" },
                    { 103, "MTE", "Monte" },
                    { 104, "NUC", "Núcleo" },
                    { 105, "NUR", "Núcleo Rural" },
                    { 106, "OUT", "Outeiro" },
                    { 107, "PAR", "Paralela" },
                    { 108, "PAS", "Passeio" },
                    { 109, "PAT", "Pátio" },
                    { 110, "PC", "Praça" },
                    { 111, "PCE", "Praça de Esportes" },
                    { 112, "PDA", "Parada" },
                    { 113, "PDO", "Paradouro" },
                    { 114, "PNT", "Ponta" },
                    { 115, "PR", "Praia" },
                    { 116, "PRL", "Prolongamento" },
                    { 117, "PRM", "Parque Municipal" },
                    { 118, "PRQ", "Parque" },
                    { 119, "PRR", "Parque Residencial" },
                    { 120, "PSA", "Passarela" },
                    { 121, "PSG", "Passagem" },
                    { 122, "PSP", "Passagem de Pedestre" },
                    { 123, "PSS", "Passagem Subterrânea" },
                    { 124, "PTE", "Ponte" },
                    { 125, "PTO", "Porto" },
                    { 126, "Q", "Quadra" },
                    { 127, "QTA", "Quinta" },
                    { 128, "QTS", "Quintas" },
                    { 129, "R", "Rua" },
                    { 130, "R I", "Rua Integração" },
                    { 131, "R L", "Rua de Ligação" },
                    { 132, "R P", "Rua Particular" },
                    { 133, "R V", "Rua Velha" },
                    { 134, "RAM", "Ramal" },
                    { 135, "RCR", "Recreio" },
                    { 136, "REC", "Recanto" },
                    { 137, "RER", "Retiro" },
                    { 138, "RES", "Residencial" },
                    { 139, "RET", "Reta" },
                    { 140, "RLA", "Ruela" },
                    { 141, "RMP", "Rampa" },
                    { 142, "ROA", "Rodo Anel" },
                    { 143, "ROD", "Rodovia" },
                    { 144, "ROT", "Rotula" },
                    { 145, "RPE", "Rua de Pedestre" },
                    { 146, "RPR", "Margem" },
                    { 147, "RTN", "Retorno" },
                    { 148, "RTT", "Rotatória" },
                    { 149, "SEG", "Segunda Avenida" },
                    { 150, "SIT", "Sitío" },
                    { 151, "SRV", "Servidão" },
                    { 152, "ST", "Setor" },
                    { 153, "SUB", "Subida" },
                    { 154, "TCH", "Trincheira" },
                    { 155, "TER", "Terminal" },
                    { 156, "TR", "Trecho" },
                    { 157, "TRV", "Trevo" },
                    { 158, "TUN", "Túnel" },
                    { 159, "TV", "Travessa" },
                    { 160, "TVP", "Travessa Particular" },
                    { 161, "TVV", "Travessa Velha" },
                    { 162, "UNI", "Unidade" },
                    { 163, "V", "Via" },
                    { 164, "V C", "Via Coletora" },
                    { 165, "V L", "Via Local" },
                    { 166, "VAC", "Via de Acesso" },
                    { 167, "VAL", "Vala" },
                    { 168, "VCO", "Vila Costeira" },
                    { 169, "VD", "Viaduto" },
                    { 170, "V-E", "Via Expressa" },
                    { 171, "VEV", "Via Elevado" },
                    { 173, "VL", "Vila" },
                    { 174, "VLA", "Viela" },
                    { 175, "VLE", "Vale" },
                    { 176, "VLT", "Vila Litorânea" },
                    { 177, "VPE", "Via de Pedestre" },
                    { 178, "VRT", "Variante" },
                    { 179, "ZIG", "Zigue-zague" }
                });

            migrationBuilder.InsertData(
                table: "tipousuario",
                columns: new[] { "idtipousuario", "descricaotipousuario", "nivelacesso", "nometipousuario" },
                values: new object[,]
                {
                    { 1, "Entidade voltada ao time de desenvolvimento para uso da plataforma durante testes.", "A", "Desenvolvedor" },
                    { 2, "Entidade administrativa do Sistema.", "A", "Administrador" },
                    { 3, "Entidade responsável pela alimentação de informações do Sistema.", "B", "Funcionário" },
                    { 4, "Entidade auxiliar na alimentação de informações do Sistema.", "C", "Estagiário" }
                });

            migrationBuilder.InsertData(
                table: "cidade",
                columns: new[] { "idcidade", "IdEstado", "cidade" },
                values: new object[,]
                {
                    { 1, 1, "Aparecida d'Oeste" },
                    { 2, 1, "Jales" },
                    { 3, 1, "Palmeira d'Oeste" },
                    { 4, 1, "Paranapuã" },
                    { 5, 1, "Rubineia" },
                    { 6, 1, "Santa Clara d'Oeste" },
                    { 7, 1, "Santa Fé do Sul" },
                    { 8, 1, "São Francisco" },
                    { 9, 1, "São João das Duas Pontes" },
                    { 10, 1, "Urânia" }
                });

            migrationBuilder.InsertData(
                table: "usuario",
                columns: new[] { "idusuario", "cargousuario", "cpfcnpjpessoa", "emailpessoa", "IdTipoUsuario", "imagempessoa", "nomepessoa", "rgiepessoa", "senhausuario", "statususuario", "telefonepessoa" },
                values: new object[,]
                {
                    { 1, "Desenvolvimento", "000.000.000-00", "devops@development.com", 1, "", "Desenvolvedor", "00.000.000-0", "123456", true, "(00) 00000-0000" },
                    { 2, "Secretário Geral", "000.000.000-00", "admin@gmail.com", 2, "", "Secretário Geral", "00.000.000-0", "987654", true, "(00) 00000-0000" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_bairro_IdCidade",
                table: "bairro",
                column: "IdCidade");

            migrationBuilder.CreateIndex(
                name: "IX_cidade_IdEstado",
                table: "cidade",
                column: "IdEstado");

            migrationBuilder.CreateIndex(
                name: "IX_etapa_IdTipoProcesso",
                table: "etapa",
                column: "IdTipoProcesso");

            migrationBuilder.CreateIndex(
                name: "IX_logradouro_IdBairro",
                table: "logradouro",
                column: "IdBairro");

            migrationBuilder.CreateIndex(
                name: "IX_logradouro_IdTipoLogradouro",
                table: "logradouro",
                column: "IdTipoLogradouro");

            migrationBuilder.CreateIndex(
                name: "IX_usuario_IdTipoUsuario",
                table: "usuario",
                column: "IdTipoUsuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "etapa");

            migrationBuilder.DropTable(
                name: "logradouro");

            migrationBuilder.DropTable(
                name: "municipe");

            migrationBuilder.DropTable(
                name: "TipoDocumento");

            migrationBuilder.DropTable(
                name: "usuario");

            migrationBuilder.DropTable(
                name: "tipoprocesso");

            migrationBuilder.DropTable(
                name: "bairro");

            migrationBuilder.DropTable(
                name: "tipologradouro");

            migrationBuilder.DropTable(
                name: "tipousuario");

            migrationBuilder.DropTable(
                name: "cidade");

            migrationBuilder.DropTable(
                name: "estado");
        }
    }
}
