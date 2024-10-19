using AutoMapper;
using Moq;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Entities;

namespace SGEDTest
{
	[TestFixture]
	public class Tests
	{
		//private Mock<IEstadoRepository> _estadoRepositoryMock;
		//private Mock<IMapper> _mapperMock;
		//private EstadoService _estadoService;

		//[SetUp]
		//public void Setup()
		//{
		//	_estadoRepositoryMock = new Mock<IEstadoRepository>();
		//	_mapperMock = new Mock<IMapper>();
		//	_estadoService = new EstadoService(_estadoRepositoryMock.Object, _mapperMock.Object);
		//}

		//[Test]
		//public async Task Obter_TodosEstadosMapeados()
		//{
		//	var estados = new List<Estado> { new Estado { Id = 1, NomeEstado = "São Paulo" } };
		//	var estadosDTOs = new List<EstadoDTO> { new EstadoDTO { Id = 1, NomeEstado = "São Paulo" } };
		//	_estadoRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(estados);
		//	_mapperMock.Setup(m => m.Map<IEnumerable<EstadoDTO>>(estados)).Returns(estadosDTOs);

		//	var result = await _estadoService.GetAll();

		//	Assert.AreEqual(estadosDTOs, result);
		//}

		//[Test]
		//public async Task Obter_EstadoMapeadoPorId()
		//{
		//	var estado = new Estado { Id = 1, NomeEstado = "São Paulo" };
		//	var estadoDTO = new EstadoDTO { Id = 1, NomeEstado = "São Paulo" };
		//	_estadoRepositoryMock.Setup(repo => repo.GetById(1)).ReturnsAsync(estado);
		//	_mapperMock.Setup(m => m.Map<EstadoDTO>(estado)).Returns(estadoDTO);

		//	var result = await _estadoService.GetById(1);

		//	Assert.AreEqual(estadoDTO, result);
		//}

		//[Test]
		//public async Task Obter_EstadoMapeadoPorNome()
		//{
		//	var estado = new List<Estado> { new Estado { Id = 1, NomeEstado = "São Paulo" } };
		//	var estadoDTOs = new List<EstadoDTO> { new EstadoDTO { Id = 1, NomeEstado = "São Paulo" } };
		//	_estadoRepositoryMock.Setup(repo => repo.GetByName("São Paulo")).ReturnsAsync(estado);
		//	_mapperMock.Setup(m => m.Map<IEnumerable<EstadoDTO>>(estado)).Returns(estadoDTOs);

		//	var result = await _estadoService.GetByName("São Paulo");

		//	Assert.AreEqual(estadoDTOs, result);
		//}

		//[Test]
		//public async Task Cadastro_ChamadaDeEstadoMapeado()
		//{
		//	var estadoDTO = new EstadoDTO { NomeEstado = "São Paulo" };
		//	var estado = new Estado { NomeEstado = "São Paulo" };
		//	_mapperMock.Setup(m => m.Map<Estado>(estadoDTO)).Returns(estado);

		//	await _estadoService.Create(estadoDTO);

		//	_estadoRepositoryMock.Verify(repo => repo.Create(estado), Times.Once);
		//	_mapperMock.Verify(m => m.Map<Estado>(estadoDTO), Times.Once);
		//}

		//[Test]
		//public async Task Atualiza_ChamadaDeEstadoMapeado()
		//{
		//	var estadoDTO = new EstadoDTO { Id = 1, NomeEstado = "São Paulo" };
		//	var estado = new Estado { Id = 1, NomeEstado = "São Paulo" };
		//	_mapperMock.Setup(m => m.Map<Estado>(estadoDTO)).Returns(estado);

		//	await _estadoService.Update(estadoDTO);

		//	_estadoRepositoryMock.Verify(repo => repo.Update(estado), Times.Once);
		//	_mapperMock.Verify(m => m.Map<Estado>(estadoDTO), Times.Once);
		//}

		//[Test]
		//public async Task Remove_ChamadaDeEstadoDeletado()
		//{
		//	var estadoId = 1;

		//	await _estadoService.Remove(estadoId);

		//	_estadoRepositoryMock.Verify(repo => repo.Delete(estadoId), Times.Once);
		//}
	}
}