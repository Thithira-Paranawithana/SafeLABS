using System;
using SafeLABS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace SafeLABS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceTypeDetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ResourceTypeDetailsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("getResourceTypeDetails")]
        public JsonResult GetResourceTypeDetails(SafeLABS_models cls)
        {
            try
            {
                SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration));

                try
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("getResourceTypeDetails", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@resourceTypeId", SqlDbType.Int).Value = cls.Id;

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
        [Route("insertResourceType")]
        public JsonResult InsertResourceType(SafeLABS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("insertResourceType", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@resourceType", SqlDbType.VarChar).Value = cls.resourceType.Trim();
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
        [Route("updateResourceType")]
        public JsonResult UpdateResourceType(SafeLABS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("updateResourceType", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@resourceType", SqlDbType.VarChar, 15).Value = cls.resourceType.Trim();
                        cmd.Parameters.Add("@updateBy", SqlDbType.Int).Value = cls.updateBy;
                        cmd.Parameters.Add("@resourceTypeId", SqlDbType.Int).Value = cls.Id;

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

        [HttpPost]
        [Route("getAllResourceTypes")]
        public JsonResult GetAllResourceTypes([FromBody] SafeLABS_models cls)
        {
            try
            {
                SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration));

                try
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("getAllResourceTypes", con);
                    cmd.CommandType = CommandType.StoredProcedure;

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
    }
}
