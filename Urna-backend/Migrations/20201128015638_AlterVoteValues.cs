using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Urna_backend.Migrations
{
    public partial class AlterVoteValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Votes_Candidates_candidateId",
                table: "Votes");

            migrationBuilder.DropIndex(
                name: "IX_Votes_candidateId",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "candidateId",
                table: "Votes");

            migrationBuilder.AddColumn<bool>(
                name: "blankVote",
                table: "Votes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "captionNumber",
                table: "Votes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "nullVote",
                table: "Votes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "voteFor",
                table: "Votes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "blankVote",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "captionNumber",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "nullVote",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "voteFor",
                table: "Votes");

            migrationBuilder.AddColumn<Guid>(
                name: "candidateId",
                table: "Votes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Votes_candidateId",
                table: "Votes",
                column: "candidateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Votes_Candidates_candidateId",
                table: "Votes",
                column: "candidateId",
                principalTable: "Candidates",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
