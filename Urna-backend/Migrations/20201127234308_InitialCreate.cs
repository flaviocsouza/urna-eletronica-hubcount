using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Urna_backend.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Candidates",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    viceCandidateName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    registrationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    captionNumber = table.Column<int>(type: "int", nullable: false),
                    role = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidates", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Votes",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    voteCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    candidateId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    voteDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Votes", x => x.id);
                    table.ForeignKey(
                        name: "FK_Votes_Candidates_candidateId",
                        column: x => x.candidateId,
                        principalTable: "Candidates",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Votes_candidateId",
                table: "Votes",
                column: "candidateId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Votes");

            migrationBuilder.DropTable(
                name: "Candidates");
        }
    }
}
