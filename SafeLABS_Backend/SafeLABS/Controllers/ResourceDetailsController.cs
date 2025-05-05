using System;
using SafeLABS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Security.AccessControl;

namespace SafeLABS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceDetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ResourceDetailsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("getResourceDetails")]
        public JsonResult GetResourceDetails(SafeLABS_models cls)
        {
            try
            {
                SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration));

                try
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("getResourceDetails", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@resourceId", SqlDbType.Int).Value = cls.Id;

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


        [HttpPut]
        [Route("updateResourceDetails")]
        public JsonResult UpdateResourceDetails(SafeLABS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("updateResourceDetails", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@resourceType", SqlDbType.VarChar).Value = cls.resourceType.Trim();
                        cmd.Parameters.Add("@brand", SqlDbType.VarChar).Value = cls.brand.Trim();
                        cmd.Parameters.Add("@price", SqlDbType.Decimal).Value = cls.price;
                        cmd.Parameters.Add("@updateBy", SqlDbType.Int).Value = cls.updateBy;
                        cmd.Parameters.Add("@resourceId", SqlDbType.Int).Value = cls.Id; 
                    

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
        [Route("getAllResources")]
        public JsonResult getAllResources([FromBody] SafeLABS_models cls)
        {
            try
            {
                SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration));

                try
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("getAllResources", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    //cmd.Parameters.Add("@employeeId", SqlDbType.Char).Value = cls.employeeId.Trim();

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
        [Route("insertNewResource")]
        public JsonResult insertNewResource(SafeLABS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("insertNewResource", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@resourceType", SqlDbType.VarChar).Value = cls.resourceType.Trim();
                        cmd.Parameters.Add("@brand", SqlDbType.VarChar).Value = cls.brand.Trim();
                        cmd.Parameters.Add("@price", SqlDbType.Decimal).Value = cls.price;
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
    }
}
