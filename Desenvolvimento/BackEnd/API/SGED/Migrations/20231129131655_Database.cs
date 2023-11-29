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
                    nomepessoa = table.Column<string>(type: "character varying(70)", maxLength: 70, nullable: false),
                    emailpessoa = table.Column<string>(type: "text", nullable: false),
                    telefonepessoa = table.Column<string>(type: "character varying(19)", maxLength: 19, nullable: false),
                    cpfcnpjpessoa = table.Column<string>(type: "character varying(18)", maxLength: 18, nullable: false),
                    rgiepessoa = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_municipe", x => x.idmunicipe);
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
                    nomecidade = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
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
                name: "usuario",
                columns: table => new
                {
                    idusuario = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    senhausuario = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    cargousuario = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    statususuario = table.Column<bool>(type: "boolean", nullable: false),
                    IdTipoUsuario = table.Column<int>(type: "integer", nullable: false),
                    nomepessoa = table.Column<string>(type: "character varying(70)", maxLength: 70, nullable: false),
                    emailpessoa = table.Column<string>(type: "text", nullable: false),
                    telefonepessoa = table.Column<string>(type: "character varying(19)", maxLength: 19, nullable: false),
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

            migrationBuilder.InsertData(
                table: "estado",
                columns: new[] { "idestado", "nomeestado", "ufestado" },
                values: new object[] { 1, "São Paulo", "SP" });

            migrationBuilder.InsertData(
                table: "tipousuario",
                columns: new[] { "idtipousuario", "descricaotipousuario", "nivelacesso", "nometipousuario" },
                values: new object[,]
                {
                    { 1, "Pode efetuar todas as funcionalidades disponíveis. Voltado ao time de desenvolvimento.", "A", "Desenvolvedor" },
                    { 2, "Pode efetuar todas as funcionalidades disponíveis.", "A", "Secretário Geral" },
                    { 3, "Pode efetuar todas as funcionalidades disponíveis, porém com auditoria de ações.", "B", "Secretário" },
                    { 4, "Apenas vizualizar informações, exceto senhas.", "C", "Jurídico" },
                    { 5, "Apenas vizualizar informações, porém dados sensíveis são mascarados.", "D", "Físico" }
                });

            migrationBuilder.InsertData(
                table: "cidade",
                columns: new[] { "idcidade", "IdEstado", "nomecidade" },
                values: new object[] { 1, 1, "Jales" });

            migrationBuilder.InsertData(
                table: "usuario",
                columns: new[] { "idusuario", "cargousuario", "cpfcnpjpessoa", "emailpessoa", "IdTipoUsuario", "nomepessoa", "rgiepessoa", "senhausuario", "statususuario", "telefonepessoa" },
                values: new object[] { 1, "Desenvolvimento", "123.123.123-21", "devops@development.com", 1, "Dev", "43.345.345-1", "123456", true, "+55 (17) 99966-5555" });

            migrationBuilder.CreateIndex(
                name: "IX_cidade_IdEstado",
                table: "cidade",
                column: "IdEstado");

            migrationBuilder.CreateIndex(
                name: "IX_usuario_IdTipoUsuario",
                table: "usuario",
                column: "IdTipoUsuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "cidade");

            migrationBuilder.DropTable(
                name: "municipe");

            migrationBuilder.DropTable(
                name: "usuario");

            migrationBuilder.DropTable(
                name: "estado");

            migrationBuilder.DropTable(
                name: "tipousuario");
        }
    }
}
