using AutoMapper;
using Moq;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Entities;

namespace SGEDTest.RepositoriesServices.Test
{
	[TestFixture]
	public class TipoLogradouroRepositoryService
	{
		private Mock<ITipoLogradouroRepository> _tipoLogradouroRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private TipoLogradouroService _tipoLogradouroService;

		[SetUp]
		public void SetUp()
		{
			_tipoLogradouroRepositoryMock = new Mock<ITipoLogradouroRepository>();
			_mapperMock = new Mock<IMapper>();
			_tipoLogradouroService = new TipoLogradouroService(_tipoLogradouroRepositoryMock.Object, _mapperMock.Object);
		}

		[Test]
		public async Task ObterTodosTiposLogradourosMapeados()
		{
			var tipoLogradouro = new List<TipoLogradouro> { new TipoLogradouro { Id = 1, CodigoInformativo = "A", Descricao = "Área" } };
			var tipoLogradouroDTO = new List<TipoLogradouroDTO> { new TipoLogradouroDTO { Id = 1, CodigoInformativo = "A", Descricao = "Área" } };
			_tipoLogradouroRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(tipoLogradouro);
			_mapperMock.Setup(m => m.Map<IEnumerable<TipoLogradouroDTO>>(tipoLogradouro)).Returns(tipoLogradouroDTO);

			var result = await _tipoLogradouroService.GetAll();

			Assert.That(result, Is.EqualTo(tipoLogradouroDTO));
		}

		[Test]
		public async Task Obter_TipoLogradouroMapeadoPorId()
		{
			var tipoLogradouro = new TipoLogradouro { Id = 1, CodigoInformativo = "A", Descricao = "Área" };
			var tipoLogradouroDTO = new TipoLogradouroDTO { Id = 1, CodigoInformativo = "A", Descricao = "Área" };
			_tipoLogradouroRepositoryMock.Setup(repo => repo.GetById(1)).ReturnsAsync(tipoLogradouro);
			_mapperMock.Setup(m => m.Map<TipoLogradouroDTO>(tipoLogradouro)).Returns(tipoLogradouroDTO);

			var result = await _tipoLogradouroService.GetById(1);

			Assert.That(result, Is.EqualTo(tipoLogradouroDTO));
		}

		[Test]
		public async Task Cadastro_ChamadaDeTipoLogradouroMapeado()
		{
			var tipoLogradouro = new TipoLogradouro { Id = 1, CodigoInformativo = "A", Descricao = "Área" };
			var tipoLogradouroDTO = new TipoLogradouroDTO { Id = 1, CodigoInformativo = "A", Descricao = "Área" };
			_mapperMock.Setup(tp => tp.Map<TipoLogradouro>(tipoLogradouroDTO)).Returns(tipoLogradouro);

			await _tipoLogradouroService.Create(tipoLogradouroDTO);

			_tipoLogradouroRepositoryMock.Verify(repo => repo.Create(tipoLogradouro), Times.Once);
			_mapperMock.Verify(tp => tp.Map<TipoLogradouro>(tipoLogradouroDTO), Times.Once);
		}

		[Test]
		public async Task Atualiza_ChamadaDeTipoLogradouroMapeado()
		{
			var tipoLogradouro = new TipoLogradouro { Id = 1, CodigoInformativo = "A", Descricao = "Área" };
			var tipoLogradouroDTO = new TipoLogradouroDTO { Id = 1, CodigoInformativo = "A", Descricao = "Área" };
			_mapperMock.Setup(tp => tp.Map<TipoLogradouro>(tipoLogradouroDTO)).Returns(tipoLogradouro);	

			await _tipoLogradouroService.Update(tipoLogradouroDTO);

			_tipoLogradouroRepositoryMock.Verify(repo => repo.Update(tipoLogradouro), Times.Once);
			_mapperMock.Verify(tp => tp.Map<TipoLogradouro>(tipoLogradouroDTO), Times.Once);
		}

		[Test]
		public async Task Remove_ChamadaDeTipoLogradouroDeletado()
		{
			var tipoLogradouroId = 1;

			await _tipoLogradouroService.Remove(tipoLogradouroId);

			_tipoLogradouroRepositoryMock.Verify(repo => repo.Delete(tipoLogradouroId), Times.Once);
		}
	}
}