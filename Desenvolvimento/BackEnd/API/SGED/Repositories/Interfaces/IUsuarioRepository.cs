﻿using SGED.Objects.Models.Entities;
using SGED.Objects.Server;

namespace SGED.Repositories.Interfaces;
public interface IUsuarioRepository
{
    Task<IEnumerable<UsuarioModel>> GetAll();
    Task<IEnumerable<UsuarioModel>> Search(string search);
    Task<IEnumerable<UsuarioModel>> GetByEmail(int id, string email);
    Task<UsuarioModel> GetById(int id);
    Task<UsuarioModel> Login(Login login);
    Task<UsuarioModel> Create(UsuarioModel usuarioModel);
    Task<UsuarioModel> Update(UsuarioModel usuarioModel);
    Task<UsuarioModel> Delete(int id);
}
