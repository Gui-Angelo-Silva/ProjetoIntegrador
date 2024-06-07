using AutoMapper;
using Moq;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Entities;

namespace SGEDTest.RepositoriesServices.Test
{
	[TestFixture]
	public class BairroRepositoryService
	{
		private Mock<IBairroRepository> _bairroRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private BairroService _bairroService;

		[SetUp]
		public void SetUp()
		{
			_bairroRepositoryMock = new Mock<IBairroRepository>();
			_mapperMock = new Mock<IMapper>();
			_bairroService = new BairroService(_bairroRepositoryMock.Object, _mapperMock.Object);
		}

		[Test]
		public async Task Obter_TodosBairrosMapeados()
		{
			var bairro = new List<Bairro> { new Bairro { Id = 1, NomeBairro = "Residencial São Lucas", IdCidade = 1 } };
			var bairroDTO = new List<BairroDTO> { new BairroDTO { Id = 1, NomeBairro = "Residencial São Lucas", IdCidade = 1 } };
			_bairroRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(bairro);
			_mapperMock.Setup(m => m.Map<IEnumerable<BairroDTO>>(bairro)).Returns(bairroDTO);

			var result = await _bairroService.GetAll();

			Assert.That(result, Is.EqualTo(bairroDTO));
		}

		[Test]
		public async Task Obter_BairroMapeadoPorId()
		{
			var bairro = new Bairro { Id = 1, NomeBairro = "Residencial São Lucas", IdCidade = 1 };
			var bairroDTO = new BairroDTO { Id = 1, NomeBairro = "Residencial São Lucas", IdCidade = 1 };
			_bairroRepositoryMock.Setup(repo => repo.GetById(1)).ReturnsAsync(bairro);
			_mapperMock.Setup(m => m.Map<BairroDTO>(bairro)).Returns(bairroDTO);

			var result = await _bairroService.GetById(1);

			Assert.That(result, Is.EqualTo(bairroDTO));
		}

		[Test]
		public async Task Cadastro_ChamadadeBairroMapeado()
		{
			var bairroDTO = new BairroDTO { NomeBairro = "Residencial São Lucas", IdCidade = 1 };
			var bairro = new Bairro { NomeBairro = "Residencial São Lucas", IdCidade = 1 };
			_mapperMock.Setup(c => c.Map<Bairro>(bairroDTO)).Returns(bairro);

			await _bairroService.Create(bairroDTO);

			_bairroRepositoryMock.Verify(repo => repo.Create(bairro), Times.Once);
			_mapperMock.Verify(c => c.Map<Bairro>(bairroDTO), Times.Once);
		}

		[Test]
		public async Task Atualiza_ChamadaDeBairroMapeado()
		{
			var bairroDTO = new BairroDTO { NomeBairro = "Residencial São Lucas", IdCidade = 1 };
			var bairro = new Bairro { NomeBairro = "Residencial São Lucas", IdCidade = 1 };
			_mapperMock.Setup(c => c.Map<Bairro>(bairroDTO)).Returns(bairro);

			await _bairroService.Update(bairroDTO);

			_bairroRepositoryMock.Verify(repo => repo.Update(bairro), Times.Once);
			_mapperMock.Verify(c => c.Map<Bairro>(bairroDTO), Times.Once);
		}

		[Test]	
		public async Task Remove_ChamadaDeBairroDeletado()
		{
			var bairroId = 1;

			await _bairroService.Remove(bairroId);

			_bairroRepositoryMock.Verify(repo => repo.Delete(bairroId), Times.Once);	
		}
	}
}