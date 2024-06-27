using Microsoft.AspNetCore.Mvc;
using Moq;
using SGED.Controllers;
using SGED.Objects.DTO.Entities;
using SGED.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace SGEDTest.Controllers.Test
{
	[TestFixture]
	public class BairroControllerTest
	{
        private Mock<ICidadeService> _cidadeServiceMock;
        private Mock<IBairroService> _bairroServiceMock;
		private BairroController _bairroController;

		[SetUp]
		public void Setup()
		{
            _cidadeServiceMock = new Mock<ICidadeService>();
            _bairroServiceMock = new Mock<IBairroService>();
			_bairroController = new BairroController(_cidadeServiceMock.Object, _bairroServiceMock.Object);
		}

		[Test]
		public async Task Obter_TodosBairrosRetornadosComOk()
		{
			var bairro = new List<BairroDTO> { new BairroDTO { Id = 1, NomeBairro = "Residencial São Lucas", IdCidade = 1 } };
			_bairroServiceMock.Setup(service => service.GetAll()).ReturnsAsync(bairro);

			var result = await _bairroController.Get();

			var okResult = result.Result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
		}

		[Test]
		public async Task Obter_BairroRetornadoPorId()
		{
			var bairro = new BairroDTO { Id = 1, NomeBairro = "Residencial São Lucas", IdCidade = 1 };
			_bairroServiceMock.Setup(service => service.GetById(1)).ReturnsAsync(bairro);

			var result = await _bairroController.Get(1);

			var okResult = result.Result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(bairro));
		}

		[Test]
		public async Task Obter_BairroRetornadoPorIdQuandoNaoExiste()
		{
			_bairroServiceMock.Setup(service => service.GetById(1)).ReturnsAsync((BairroDTO)null);

			var result = await _bairroController.Get(1);

			var notFoundResult = result.Result as NotFoundObjectResult;
			Assert.IsNotNull(notFoundResult);
			Assert.That(notFoundResult.StatusCode, Is.EqualTo(404));
			Assert.That(notFoundResult.Value, Is.EqualTo("Bairro não encontrado!"));
		}

		[Test]
		public async Task Cadastro_RetornaResultadoCreatedAtRoute()
		{
			var bairro = new BairroDTO { Id = 1, NomeBairro = "Residencial São Lucas", IdCidade = 1 };
			_bairroServiceMock.Setup(service => service.Create(bairro)).Returns(Task.CompletedTask);

			var result = await _bairroController.Post(bairro);

			var createdAtRouteResult = result as CreatedAtRouteResult;
			Assert.IsNotNull(createdAtRouteResult);
			Assert.That(createdAtRouteResult.StatusCode, Is.EqualTo(201));
			Assert.That(createdAtRouteResult.RouteName, Is.EqualTo("GetBairro"));
			Assert.That(createdAtRouteResult.RouteValues["id"], Is.EqualTo(bairro.Id));
			Assert.That(createdAtRouteResult.Value, Is.EqualTo(bairro));
		}

		[Test]
		public async Task Cadastro_RetornaBadRequestQuandoBairroDTOENulo()
		{
			var result = await _bairroController.Post(null);

			var badRequestResult = result as BadRequestObjectResult;
			Assert.IsNotNull(badRequestResult);
			Assert.That(badRequestResult.StatusCode, Is.EqualTo(400));
			Assert.That(badRequestResult.Value, Is.EqualTo("Dado inválido!"));
		}

		[Test]
		public async Task Atualiza_ComRetornoOkDeBairro()
		{
			var bairro = new BairroDTO { Id = 1, NomeBairro = "Residencial São Lucas", IdCidade = 1 };
			_bairroServiceMock.Setup(service => service.Update(bairro)).Returns(Task.CompletedTask);

			var result = await _bairroController.Put(bairro);

			var okResult = result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(bairro));
		}

		[Test]
		public async Task Atualiza_QuandoRetornaBadRequestSendoBairroDTONulo()
		{
			var result = await _bairroController.Put(null);

			var badRequestResult = result as BadRequestObjectResult;
			Assert.IsNotNull(badRequestResult);
			Assert.That(badRequestResult.StatusCode, Is.EqualTo(400));
			Assert.That(badRequestResult.Value, Is.EqualTo("Dado inválido!"));
		}

		[Test]
		public async Task Deleta_BairroComRetornoDeResultadoOk()
		{
			var bairro = new BairroDTO { Id = 1, NomeBairro = "Residencial São Lucas", IdCidade = 1 };
			_bairroServiceMock.Setup(service => service.GetById(1)).ReturnsAsync(bairro);
			_bairroServiceMock.Setup(service => service.Remove(1)).Returns(Task.CompletedTask);

			var result = await _bairroController.Delete(1);

			var okResult = result.Result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
			Assert.That(okResult.Value, Is.EqualTo(bairro));
		}

		[Test]
		public async Task Deleta_BairroComRetornoNotFoundQuandoNaoExiste()
		{
			_bairroServiceMock.Setup(service => service.GetById(1)).ReturnsAsync((BairroDTO)null);

			var result = await _bairroController.Delete(1);

			var notFoundResult = result.Result as NotFoundObjectResult;
			Assert.IsNotNull(notFoundResult);
			Assert.That(notFoundResult.StatusCode, Is.EqualTo(404));
			Assert.That(notFoundResult.Value, Is.EqualTo("Bairro não encontrado!"));
		}
	}
}