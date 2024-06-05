using Microsoft.AspNetCore.Mvc;
using Moq;
using SGED.Controllers;
using SGED.Objects.DTO.Entities;
using SGED.Services.Interfaces;

namespace SGEDTest.Controllers.Test
{
	[TestFixture]
	public class CidadeControllerTest
	{
		private Mock<ICidadeService> _cidadeServiceMock;
		private CidadeController _cidadeController;

		[SetUp]
		public void Setup()
		{
			_cidadeServiceMock = new Mock<ICidadeService>();
			_cidadeController = new CidadeController(_cidadeServiceMock.Object);
		}

		[Test]
		public async Task Obter_TodasCidadesRetornadasComOk()
		{
			var cidade = new List<CidadeDTO> { new CidadeDTO { Id = 1, NomeCidade = "Jales", IdEstado = 1 } };
			_cidadeServiceMock.Setup(service => service.GetAll()).ReturnsAsync(cidade);

			var result = await _cidadeController.Get();

			var okResult = result.Result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(cidade));
		}

		[Test]
		public async Task Obter_CidadeRetornadaComOkPorId()
		{
			var cidade = new CidadeDTO { Id = 1, NomeCidade = "Jales", IdEstado = 1 };
			_cidadeServiceMock.Setup(service => service.GetById(1)).ReturnsAsync(cidade);

			var result = await _cidadeController.Get(1);

			var okResult = result.Result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(cidade));
		}

		[Test]
		public async Task Obter_CidadeRetornadaPorIdQuandoNaoExiste()
		{
			_cidadeServiceMock.Setup(service => service.GetById(1)).ReturnsAsync((CidadeDTO)null);

			var result = await _cidadeController.Get(1);

			var notFoundResult = result.Result as NotFoundObjectResult;
			Assert.IsNotNull(notFoundResult);
			Assert.That(notFoundResult.StatusCode, Is.EqualTo(404));
			Assert.That(notFoundResult.Value, Is.EqualTo("Cidade não encontrada!"));
		}

		[Test]
		public async Task Cadastro_RetornaResultadoCreatedAtRoute()
		{
			var cidadeDTO = new CidadeDTO { Id = 1, NomeCidade = "Jales", IdEstado = 1 };
			_cidadeServiceMock.Setup(service => service.Create(cidadeDTO)).Returns(Task.CompletedTask);

			var result = await _cidadeController.Post(cidadeDTO);

			var createdAtRouteResult = result as CreatedAtRouteResult;
			Assert.IsNotNull(createdAtRouteResult);
			Assert.That(createdAtRouteResult.StatusCode, Is.EqualTo(201));
			Assert.That(createdAtRouteResult.RouteName, Is.EqualTo("GetCidade"));
			Assert.That(createdAtRouteResult.RouteValues["id"], Is.EqualTo(cidadeDTO.Id));
			Assert.That(createdAtRouteResult.Value, Is.EqualTo(cidadeDTO));
		}

		[Test]
		public async Task Cadastro_RetornaBadRequestQuandoCidadeDTOENulo()
		{
			var result = await _cidadeController.Post(null);

			var badRequestResult = result as BadRequestObjectResult;
			Assert.IsNotNull(badRequestResult);
			Assert.That(badRequestResult.StatusCode, Is.EqualTo(400));
			Assert.That(badRequestResult.Value, Is.EqualTo("Dado inválido!"));
		}

		[Test]
		public async Task Atualiza_ComRetornoOKDaCidade()
		{
			var cidadeDTO = new CidadeDTO { Id = 1, NomeCidade = "Jales", IdEstado = 1 };
			_cidadeServiceMock.Setup(service => service.Update(cidadeDTO)).Returns(Task.CompletedTask);

			var result = await _cidadeController.Put(cidadeDTO);

			var okResult = result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(cidadeDTO));
		}

		[Test]
		public async Task Atualiza_QuandoRetornaBadRequestSendoCidadeDTONulo()
		{
			var result = await _cidadeController.Put(null);

			var badRequestResult = result as BadRequestObjectResult;
			Assert.IsNotNull(badRequestResult);
			Assert.That(badRequestResult.StatusCode, Is.EqualTo(400));
			Assert.That(badRequestResult.Value, Is.EqualTo("Dado inválido!"));
		}

		[Test]
		public async Task Deleta_CidadeComRetornoDeResultadoOk()
		{
			var cidade = new CidadeDTO { Id = 1, NomeCidade = "Jales", IdEstado = 1 };
			_cidadeServiceMock.Setup(service => service.GetById(1)).ReturnsAsync(cidade);
			_cidadeServiceMock.Setup(service => service.Remove(1)).Returns(Task.CompletedTask);

			var result = await _cidadeController.Delete(1);

			var okResult = result.Result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(cidade));
		}

		[Test]
		public async Task Deleta_EstadoComRetornoNotFoundQuandoNaoExiste()
		{
			_cidadeServiceMock.Setup(service => service.GetById(1)).ReturnsAsync((CidadeDTO)null);

			var result = await _cidadeController.Delete(1);

			var notFoundResult = result.Result as NotFoundObjectResult;
			Assert.IsNotNull(notFoundResult);
			Assert.That(notFoundResult.StatusCode, Is.EqualTo(404));
			Assert.That(notFoundResult.Value, Is.EqualTo("Cidade não encontrada!"));
		}
	}
}