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
    public class AnnouncementDetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AnnouncementDetailsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpPost]
        [Route("getAnnouncement")]
        public JsonResult getAnnouncement(SafeLABS_models cls)
        {
            try
            {
                SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration));

                try
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("getAnnouncement", con);
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


        [HttpPost]
        [Route("insertAnnouncement")]
        public JsonResult insertAnnouncement(SafeLABS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("insertAnnouncement", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@description", SqlDbType.VarChar).Value = cls.description.Trim();
                        cmd.Parameters.Add("@isToAll", SqlDbType.Int).Value = cls.isToAll;
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
        [Route("updateAnnouncement")]
        public JsonResult UpdateAnnouncement(SafeLABS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("updateAnnouncement", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Add parameters for the update operation
                        cmd.Parameters.Add("@Id", SqlDbType.Int).Value = cls.Id;
                        cmd.Parameters.Add("@description", SqlDbType.VarChar).Value = cls.description;
                        cmd.Parameters.Add("@isToAll", SqlDbType.Int).Value = cls.isToAll;
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
