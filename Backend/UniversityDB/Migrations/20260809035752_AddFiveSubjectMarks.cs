using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniversityDB.Migrations
{
    /// <inheritdoc />
    public partial class AddFiveSubjectMarks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "English",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Maths",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Science",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Social",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Tamil",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "English",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Maths",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Science",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Social",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Tamil",
                table: "Students");
        }
    }
}
