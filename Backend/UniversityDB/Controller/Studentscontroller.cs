namespace UniversityDB.Controller;

using Microsoft.AspNetCore.Mvc;
using UniversityDB.Models;
using UniversityDB.Data;

[ApiController]
[Route("api/[controller]")]
public class Studentcontroller : ControllerBase
{
    private readonly AppDBContext _context;
    public Studentcontroller(AppDBContext context)
    {
        _context = context;
    }
    [HttpGet]
    public IActionResult GetStudents(string department)
    {
        // var students = _context.Students.Where(s => s.Year == year && s.Department == department).ToList();
        var students = _context.Students.Where(s => s.Department == department).ToList();
        return Ok(students);
    }
    [HttpGet("{regno}")]
    public IActionResult GetStudentsById(string regno)
    {
        var studentId = _context.Students.FirstOrDefault(s => s.RegNo == regno);
        if (studentId == null) { return NotFound("Student Not Founded!!"); }
        return Ok(studentId);
    }

    [HttpPost]
    public IActionResult PostStudentData(StudentDTO dto)
    {
        var student = new Student
        {
            Name = dto.Name,
            RegNo = dto.RegNo,
            DateOfBirth = dto.DateOfBirth,
            GovtId = dto.GovtId,
            Mark10 = dto.Mark10,
            Mark12 = dto.Mark12,
            Year = dto.Year,
            Department = dto.Department,
            English = dto.English,
            Tamil = dto.Tamil,
            Maths = dto.Maths,
            Science = dto.Science,
            Social = dto.Social,
            FatherName = dto.FatherName,
            MotherName = dto.MotherName,
            Gender = dto.Gender
        };
        _context.Students.Add(student);
        _context.SaveChanges();
        return Ok(student);
    }

    [HttpPut("{regno}")]
    public IActionResult PutStudentData(string regno, StudentPTDTO dto)
    {
        var student = _context.Students.FirstOrDefault(s => s.RegNo == regno);
        if (student == null)
        {
            return NotFound("Unable to find the Student");
        }
        if (dto.Name != null)
        {
            student.Name = dto.Name;
        }
        if (dto.Age.HasValue)
        {
            student.Age = dto.Age.Value;
        }
        if (dto.Gender != null)
        {
            student.Gender = dto.Gender;
        }
        if (dto.RegNo != null)
        {
            student.RegNo = dto.RegNo;
        }
        if (dto.FatherName != null)
        {
            student.FatherName = dto.FatherName;
        }
        if (dto.MotherName != null)
        {
            student.MotherName = dto.MotherName;
        }
        _context.SaveChanges();
        return Ok(student);
    }

    [HttpPut("{regno}/marks")]
    public IActionResult PostStudentMark(string regno,StudentMarkDTO dto)
    {
        var student = _context.Students.FirstOrDefault(s => s.RegNo == regno);
        if (student == null)
        {
            return NotFound("Unable to find the student");
        }
        student.English = dto.English;
        student.Tamil = dto.Tamil;
        student.Maths = dto.Maths;
        student.Science = dto.Science;
        student.Social = dto.Social;
        _context.SaveChanges();
        return Ok(student);
    }

    [HttpDelete("{regno}")]
    public IActionResult DeleteStudentById(string regno)
    {
        var record = _context.Students.FirstOrDefault(s => s.RegNo == regno);
        if (record == null) { return NotFound("Unable to find student"); }
        _context.Students.Remove(record);
        _context.SaveChanges();
        return Ok("Student deleted Succesfully");
    }
}