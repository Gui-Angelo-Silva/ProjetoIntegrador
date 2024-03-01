using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SGED.Migrations
{
    /// <inheritdoc />
    public partial class Database_v01 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "sessao",
                columns: table => new
                {
                    idsessao = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    datahoraabertura = table.Column<string>(type: "text", nullable: false),
                    datahorafechamento = table.Column<string>(type: "text", nullable: true),
                    statussessao = table.Column<bool>(type: "boolean", nullable: false),
                    UsuarioId = table.Column<int>(type: "integer", nullable: false),
                    IdUsuario = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sessao", x => x.idsessao);
                    table.ForeignKey(
                        name: "FK_sessao_usuario_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "usuario",
                        principalColumn: "idusuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_sessao_UsuarioId",
                table: "sessao",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "sessao");
        }
    }
}
