namespace UniversityDB.Models;

public class StudentDTO
{
    public string Name { get; set; } = string.Empty;
    public string RegNo { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public int Year { get; set; }
    public string Department { get; set; } = string.Empty;
    public string GovtId { get; set; } = string.Empty;
    public int Mark10 { get; set; }
    public int Mark12 { get; set; }
    public int English { get; set; }
    public int Tamil { get; set; }
    public int Maths { get; set; }
    public int Science { get; set; }
    public int Social { get; set; }
    public string FatherName { get; set; } = string.Empty;
    public string MotherName { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
}