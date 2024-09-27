using AlunosApi.Context;
using AlunosApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlunosApi.Services
{
    public class AlunosService
    {
        private readonly AppDbContext _context;

        public AlunosService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Aluno>> GetAlunos()
        {
            try
            {
                return await _context.Alunos.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task CreateAluno(Aluno aluno)
        {
            _context.Alunos.Add(aluno);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAluno(Aluno aluno)
        {
            _context.Entry(aluno).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<Aluno> GetAluno(int id)
        {
            Aluno aluno = await _context.Alunos.FindAsync(id);
            return aluno;
        }

        public async Task DeleteAluno(Aluno aluno)
        {
            _context.Alunos.Remove(aluno);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Aluno>> GetAlunoByName(string nome)
        {
            if (!string.IsNullOrWhiteSpace(nome))
            {
                var alunos = await _context.Alunos.Where(n => n.Nome.Contains(nome)).ToListAsync();
                return alunos;
            }
            else
            {
                var alunos = await GetAlunos();
                return alunos;
            }
        }
    }
}
