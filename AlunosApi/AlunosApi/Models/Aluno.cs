using System.ComponentModel.DataAnnotations;

namespace AlunosApi.Models
{
    public partial class Aluno
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(80, ErrorMessage = "")]
        public string Nome { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100, ErrorMessage = "")]
        public string Email { get; set; }

        [Required]
        public int Idade { get; set; }
    }
}
