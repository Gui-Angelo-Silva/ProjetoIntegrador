using Microsoft.AspNetCore.Mvc;
using Moq;
using SGED.Controllers;
using SGED.Objects.DTO.Entities;
using SGED.Services.Interfaces;

namespace SGEDTest.Controllers.Test
{
	[TestFixture]
	public class EstadoControllerTest
	{
		// "as" é uma conversão segura (safe casting), converte o resultado em um objeto

		private Mock<IEstadoService> _estadoServiceMock;
		private EstadoController _estadoController;

		[SetUp]
		public void Setup()
		{
			_estadoServiceMock = new Mock<IEstadoService>();
			_estadoController = new EstadoController(_estadoServiceMock.Object);
		}

		[Test]
		public async Task Obter_TodosEstadoRetornadosComOk()
		{
			var estados = new List<EstadoDTO> { new EstadoDTO { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" } };
			_estadoServiceMock.Setup(service => service.GetAll()).ReturnsAsync(estados);

			var result = await _estadoController.GetAll();

			var okResult = result.Result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(estados));
		}

		[Test]
		public async Task Obter_EstadoRetornadoComOkPorId()
		{
			var estados = new EstadoDTO { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" };
			_estadoServiceMock.Setup(service => service.GetById(1)).ReturnsAsync(estados);

			var result = await _estadoController.GetById(1);

			var okResult = result.Result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(estados));
		}

		[Test]
		public async Task Obter_EstadoRetornadoPorIdQuandoNaoExiste()
		{
			_estadoServiceMock.Setup(service => service.GetById(1)).ReturnsAsync((EstadoDTO)null);

			var result = await _estadoController.GetById(1);

			var notFoundResult = result.Result as NotFoundObjectResult;
			Assert.IsNotNull(notFoundResult);
			Assert.That(notFoundResult.StatusCode, Is.EqualTo(404));
			Assert.That(notFoundResult.Value, Is.EqualTo("Estado não encontrado!"));
		}

		/*[Test]
		public async Task Obter_EstadosRetornadoComOkPorNome()
		{
			var estados = new List<EstadoDTO> { new EstadoDTO { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" } };
			_estadoServiceMock.Setup(service => service.GetByName("São Paulo")).ReturnsAsync(estados);

			var result = await _estadoController.GetByName("São Paulo");

			var okResult = result.Result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(estados));
		}

		[Test]
		public async Task Obter_EstadosRetornosPorNomeQuandoNaoEncontrado()
		{
			_estadoServiceMock.Setup(service => service.GetByName("São Paulo")).ReturnsAsync((IEnumerable<EstadoDTO>)null);

			var result = await _estadoController.GetName("São Paulo");
			
			var notFoundResult = result.Result as NotFoundObjectResult;
			Assert.IsNotNull(notFoundResult);
			Assert.That(notFoundResult.StatusCode, Is.EqualTo(404));
			Assert.That(notFoundResult.Value, Is.EqualTo("Estados não econtrados!"));
		}*/

		[Test]
		public async Task Cadastro_RetornaResultadoCreateAtRoute()
		{
			var estadoDTO = new EstadoDTO { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" };
			_estadoServiceMock.Setup(service => service.Create(estadoDTO)).Returns(Task.CompletedTask);

			var result = await _estadoController.Post(estadoDTO);

			var createdAtRouteResult = result as CreatedAtRouteResult;
			Assert.IsNotNull(createdAtRouteResult);
			Assert.That(createdAtRouteResult.StatusCode, Is.EqualTo(201));
			Assert.That(createdAtRouteResult.RouteName, Is.EqualTo("GetById"));
			Assert.That(createdAtRouteResult.RouteValues["id"], Is.EqualTo(estadoDTO.Id));
			Assert.That(createdAtRouteResult.Value, Is.EqualTo(estadoDTO));
		}

		[Test]
		public async Task Cadastro_RetornaBadRequestQuandoEstadoDTOENulo()
		{
			var result = await _estadoController.Post(null);

			var badRequestResult = result as BadRequestObjectResult;
			Assert.IsNotNull(badRequestResult);
			Assert.That(badRequestResult.StatusCode, Is.EqualTo(400));
			Assert.That(badRequestResult.Value, Is.EqualTo("Dado inválido!"));
		}

		[Test]
		public async Task Atualiza_ComRetornaOkDoEstado()
		{
			var estadoDTO = new EstadoDTO { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" };
			_estadoServiceMock.Setup(service => service.Update(estadoDTO)).Returns(Task.CompletedTask);

			var result = await _estadoController.Put(estadoDTO);

			var okResult = result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(estadoDTO));
		}

		[Test]
		public async Task Atualiza_QuandoRetornaBadRequestSendoEstadoDTONulo()
		{
			var result = await _estadoController.Put(null);

			var badRequestResult = result as BadRequestObjectResult;
			Assert.IsNotNull(badRequestResult);
			Assert.That(badRequestResult.StatusCode, Is.EqualTo(400));
			Assert.That(badRequestResult.Value, Is.EqualTo("Dado inválido!"));
		}

		[Test]
		public async Task Deleta_EstadoComRetornoDeResultadoOk()
		{
			var estado = new EstadoDTO { Id = 1, NomeEstado = "São Paulo" };
			_estadoServiceMock.Setup(service => service.GetById(1)).ReturnsAsync(estado);
			_estadoServiceMock.Setup(service => service.Remove(1)).Returns(Task.CompletedTask);

			var result = await _estadoController.Delete(1);

			var okResult = result.Result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(estado));
		}

		[Test]
		public async Task Deleta_EstadoComRetornoNotFoundQuandoNaoExiste()
		{
			_estadoServiceMock.Setup(service => service.GetById(1)).ReturnsAsync((EstadoDTO)null);

			var result = await _estadoController.Delete(1);

			var notFoundResult = result.Result as NotFoundObjectResult;
			Assert.IsNotNull(notFoundResult);
			Assert.That(notFoundResult.StatusCode, Is.EqualTo(404));
			Assert.That(notFoundResult.Value, Is.EqualTo("Estado não encontrado!"));
		}
	}
}
