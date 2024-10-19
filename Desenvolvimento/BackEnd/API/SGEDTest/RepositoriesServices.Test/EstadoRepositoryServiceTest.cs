﻿using AutoMapper;
using Moq;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Entities;

namespace SGEDTest.RepositoriesServices.Test
{
	[TestFixture]
	public class EstadoRepositoryServiceTest
	{
		private Mock<IEstadoRepository> _estadoRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private EstadoService _estadoService;

		[SetUp]
		public void Setup()
		{
			_estadoRepositoryMock = new Mock<IEstadoRepository>();
			_mapperMock = new Mock<IMapper>();
			_estadoService = new EstadoService(_estadoRepositoryMock.Object, _mapperMock.Object);
		}

		[Test]
		public async Task Obter_TodosEstadosMapeados()
		{
			var estados = new List<EstadoModel> { new EstadoModel { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" } };
			var estadosDTOs = new List<EstadoDTO> { new EstadoDTO { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" } };
			_estadoRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(estados);
			_mapperMock.Setup(m => m.Map<IEnumerable<EstadoDTO>>(estados)).Returns(estadosDTOs);

			var result = await _estadoService.GetAll();

			Assert.That(result, Is.EqualTo(estadosDTOs));
		}

		[Test]
		public async Task Obter_EstadoMapeadoPorId()
		{
			var estado = new EstadoModel { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" };
			var estadoDTO = new EstadoDTO { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" };
			_estadoRepositoryMock.Setup(repo => repo.GetById(1)).ReturnsAsync(estado);
			_mapperMock.Setup(m => m.Map<EstadoDTO>(estado)).Returns(estadoDTO);

			var result = await _estadoService.GetById(1);

			Assert.That(result, Is.EqualTo(estadoDTO));
		}

		[Test]
		public async Task Obter_EstadoMapeadoPorNome()
		{
			var estado = new List<EstadoModel> { new EstadoModel { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" } };
			var estadoDTOs = new List<EstadoDTO> { new EstadoDTO { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" } };
			_estadoRepositoryMock.Setup(repo => repo.GetByName("São Paulo")).ReturnsAsync(estado);
			_mapperMock.Setup(m => m.Map<IEnumerable<EstadoDTO>>(estado)).Returns(estadoDTOs);

			var result = await _estadoService.GetByName("São Paulo");

			Assert.That(result, Is.EqualTo(estadoDTOs));
		}

		[Test]
		public async Task Cadastro_ChamadaDeEstadoMapeado()
		{
			var estadoDTO = new EstadoDTO { NomeEstado = "São Paulo", UfEstado = "SP" };
			var estado = new EstadoModel { NomeEstado = "São Paulo", UfEstado = "SP" };
			_mapperMock.Setup(m => m.Map<EstadoModel>(estadoDTO)).Returns(estado);

			await _estadoService.Create(estadoDTO);

			_estadoRepositoryMock.Verify(repo => repo.Create(estado), Times.Once);
			_mapperMock.Verify(m => m.Map<EstadoModel>(estadoDTO), Times.Once);
		}

		[Test]
		public async Task Atualiza_ChamadaDeEstadoMapeado()
		{
			var estadoDTO = new EstadoDTO { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" };
			var estado = new EstadoModel { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" };
			_mapperMock.Setup(m => m.Map<EstadoModel>(estadoDTO)).Returns(estado);

			await _estadoService.Update(estadoDTO);

			_estadoRepositoryMock.Verify(repo => repo.Update(estado), Times.Once);
			_mapperMock.Verify(m => m.Map<EstadoModel>(estadoDTO), Times.Once);
		}

		[Test]
		public async Task Remove_ChamadaDeEstadoDeletado()
		{
			var estadoId = 1;

			await _estadoService.Remove(estadoId);

			_estadoRepositoryMock.Verify(repo => repo.Delete(estadoId), Times.Once);
		}
	}
}
