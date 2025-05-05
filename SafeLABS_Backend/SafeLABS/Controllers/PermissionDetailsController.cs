using System;
using HRIS_IQ.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace HRIS_IQ.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionDetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public PermissionDetailsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("getPermission")]
        public JsonResult GetPermission(HRIS_models cls)
        {
            try
            {
                SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration));

                try
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("getPermission", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@employeeId", SqlDbType.Char).Value = cls.employeeId.Trim();

                    SqlDataReader dr = cmd.ExecuteReader();
                    DataTable dt = new DataTable();
                    dt.Load(dr);
                    dr.Close();

                    if (dt.Rows.Count > 0)
                    {
                        return new JsonResult(dt);
                    }
                    else
                    {
                        DataTable dtx = new DataTable();
                        return new JsonResult(dtx);
                    }
                }
                catch
                {
                    DataTable dtx = new DataTable();
                    return new JsonResult(dtx);
                }
                finally
                {
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Message + " - " + "Connection decrypting process unsuccessful");
            }
        }

        [HttpPost]
        [Route("insertPermission")]
        public JsonResult InsertPermission(HRIS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("insertPermission", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@permissionTypeId", SqlDbType.Int).Value = cls.permissionTypeId;
                        cmd.Parameters.Add("@employeeId", SqlDbType.Char).Value = cls.employeeId.Trim();
                        cmd.Parameters.Add("@roleId", SqlDbType.Int).Value = cls.roleId;
                        cmd.Parameters.Add("@description", SqlDbType.VarChar).Value = cls.description.Trim();
                        cmd.Parameters.Add("@insertBy", SqlDbType.Int).Value = cls.insertBy;

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return new JsonResult("Insert successful");
                        }
                        else
                        {
                            return new JsonResult("Insert failed");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("Error: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("updatePermission")]
        public JsonResult UpdatePermission(HRIS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("updatePermission", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@permissionId", SqlDbType.Int).Value = cls.permissionId;
                        cmd.Parameters.Add("@permissionTypeId", SqlDbType.Int).Value = cls.permissionTypeId;
                        cmd.Parameters.Add("@employeeId", SqlDbType.Char).Value = cls.employeeId.Trim();
                        cmd.Parameters.Add("@roleId", SqlDbType.Int).Value = cls.roleId;
                        cmd.Parameters.Add("@description", SqlDbType.VarChar, 100).Value = cls.description.Trim();
                        cmd.Parameters.Add("@updateBy", SqlDbType.Int).Value = cls.updateBy;

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return new JsonResult("Update successful");
                        }
                        else
                        {
                            return new JsonResult("Update failed");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("Error: " + ex.Message);
            }
        }
    }
}
