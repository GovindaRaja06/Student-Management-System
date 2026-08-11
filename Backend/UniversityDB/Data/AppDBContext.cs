namespace UniversityDB.Data;

using UniversityDB.Models;
using Microsoft.EntityFrameworkCore;

public class AppDBContext : DbContext
{
    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
    {

    }
    public DbSet<Student> Students { get; set; }
}