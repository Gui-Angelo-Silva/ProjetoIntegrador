using AutoMapper;
using Moq;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Entities;

namespace SGEDTest.RepositoriesServices.Test
{
	[TestFixture]
	public class CidadeRepositoryService
	{
		private Mock<ICidadeRepository> _cidadeRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private CidadeService _cidadeService;

		[SetUp]
		public void Setup()
		{
			_cidadeRepositoryMock = new Mock<ICidadeRepository>();
			_mapperMock = new Mock<IMapper>();
			_cidadeService = new CidadeService(_cidadeRepositoryMock.Object, _mapperMock.Object);
		}

		[Test]
		public async Task Obter_TodasCidadesMapeadas()
		{
			var cidade = new List<Cidade> { new Cidade { Id = 1, NomeCidade = "Jales", IdEstado = 1 } };
			var cidadeDTO = new List<CidadeDTO> { new CidadeDTO { Id = 1, NomeCidade = "Jales", IdEstado = 1 } };
			_cidadeRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(cidade);
			_mapperMock.Setup(m => m.Map<IEnumerable<CidadeDTO>>(cidade)).Returns(cidadeDTO);

			var result = await _cidadeService.GetAll();

			Assert.That(result, Is.EqualTo(cidadeDTO));
		}

		[Test]
		public async Task Obter_CidadesMapeadasPorId()
		{
			var cidade = new Cidade { Id = 1, NomeCidade = "Jales", IdEstado = 1 };
			var cidadeDTO =  new CidadeDTO { Id = 1, NomeCidade = "Jales", IdEstado = 1 };
			_cidadeRepositoryMock.Setup(repo => repo.GetById(1)).ReturnsAsync(cidade);
			_mapperMock.Setup(m => m.Map<CidadeDTO>(cidade)).Returns(cidadeDTO);

			var result = await _cidadeService.GetById(1);

			Assert.That(result, Is.EqualTo(cidadeDTO));
		}

		[Test]
		public async Task Cadastro_ChamadaDeCidadeMapeada()
		{
			var cidadeDTO = new CidadeDTO { NomeCidade = "Jales", IdEstado = 1 };
			var cidade = new Cidade { NomeCidade = "Jales", IdEstado = 1 };
			_mapperMock.Setup(c => c.Map<Cidade>(cidadeDTO)).Returns(cidade);

			await _cidadeService.Create(cidadeDTO);

			_cidadeRepositoryMock.Verify(repo => repo.Create(cidade), Times.Once);
			_mapperMock.Verify(c => c.Map<Cidade>(cidadeDTO), Times.Once);
		}

		[Test]
		public async Task Atualiza_ChamadaDeCidadeMapeada()
		{
			var cidadeDTO = new CidadeDTO { NomeCidade = "Jales", IdEstado = 1 };
			var cidade = new Cidade { NomeCidade = "Jales", IdEstado = 1 };
			_mapperMock.Setup(c => c.Map<Cidade>(cidadeDTO)).Returns(cidade);

			await _cidadeService.Update(cidadeDTO);

			_cidadeRepositoryMock.Verify(repo => repo.Update(cidade), Times.Once);
			_mapperMock.Verify(c => c.Map<Cidade>(cidadeDTO), Times.Once);
		}

		[Test]
		public async Task Remove_ChamadaDeCidadeDeletado()
		{
			var cidadeId = 1;

			await _cidadeService.Remove(cidadeId);
			
			_cidadeRepositoryMock.Verify(repo => repo.Delete(cidadeId), Times.Once);
		}
	}
}
