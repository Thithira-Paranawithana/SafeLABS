

using SafeLABS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

namespace SafeLABS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserDetailsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DataTable VerifyLogin(string email, string password, SafeLABS_models cls)
        {
            SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration));
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("logInUser", con);
                cmd.CommandType = CommandType.StoredProcedure;

                string password1 = cls.password.Trim();
                string password2 = Kripta.Encrypt(password1, "SLpassSha@#$%-=.Pas").ToString().Trim();
                //string password2 = password1.ToString().Trim();


                cmd.Parameters.Add("@email", SqlDbType.VarChar).Value = email;
                cmd.Parameters.Add("@password", SqlDbType.NVarChar).Value = password2;

                SqlDataReader dr = cmd.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();

                if (dt.Rows.Count > 0)
                {
                    return dt;
                }
                else
                {
                    DataTable dtx = new DataTable();
                    return dtx;
                }
            }
            catch //(Exception e)
            {
                DataTable dtx = new DataTable();
                return dtx;
            }
            finally
            {
                con.Close();
            }
        }

        [HttpPost]
        [Route("getUser")]
        public JsonResult GetUser([FromBody] SafeLABS_models cls)
        {
            try
            {
                SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration));

                try
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("getUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@userId", SqlDbType.Int).Value = cls.userId;

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
        [Route("insertNewUser")]
        public JsonResult InsertNewUser(SafeLABS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("insertNewUser", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                                              
                        cmd.Parameters.Add("@role", SqlDbType.VarChar).Value = cls.role.Trim();
                        cmd.Parameters.Add("@firstName", SqlDbType.VarChar).Value = cls.firstName.Trim();
                        cmd.Parameters.Add("@lastName", SqlDbType.VarChar).Value = cls.lastName.Trim();
                        cmd.Parameters.Add("@email", SqlDbType.VarChar).Value = cls.email.Trim();
                        string passwordOld = cls.password.Trim();
                        string password = Kripta.Encrypt(passwordOld, "SLpassSha@#$%-=.Pas").ToString().Trim();
                        cmd.Parameters.Add("@password", SqlDbType.NVarChar).Value = password;

                        //cmd.Parameters.Add("@password", SqlDbType.NVarChar).Value = cls.password.Trim();
                        
                        cmd.Parameters.Add("@nic", SqlDbType.VarChar).Value = cls.nic.Trim();
                        cmd.Parameters.Add("@addressLine1", SqlDbType.NVarChar).Value = cls.addressLine1.Trim();
                        cmd.Parameters.Add("@addressLine2", SqlDbType.NVarChar).Value = cls.addressLine2 == null || string.IsNullOrEmpty(cls.addressLine2.Trim()) ? (object)DBNull.Value : cls.addressLine2.Trim();
                        cmd.Parameters.Add("@city", SqlDbType.Char).Value = cls.city.Trim();
                        cmd.Parameters.Add("@contactNo", SqlDbType.BigInt).Value = cls.contactNo;
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
        [Route("updateUser")]
        public JsonResult UpdateUser(SafeLABS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("updateUser", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure; 

                        cmd.Parameters.Add("@role", SqlDbType.VarChar).Value = cls.role.Trim();
                        cmd.Parameters.Add("@firstName", SqlDbType.VarChar).Value = cls.firstName.Trim();
                        cmd.Parameters.Add("@lastName", SqlDbType.VarChar).Value = cls.lastName.Trim();
                        cmd.Parameters.Add("@email", SqlDbType.VarChar).Value = cls.email == null || string.IsNullOrEmpty(cls.email.Trim()) ? (object)DBNull.Value : cls.email.Trim();
                      //  cmd.Parameters.Add("@password", SqlDbType.VarChar).Value = cls.password.Trim();
                        cmd.Parameters.Add("@nic", SqlDbType.VarChar).Value = cls.nic.Trim();
                        cmd.Parameters.Add("@addressLine1", SqlDbType.NVarChar).Value = cls.addressLine1.Trim();
                        cmd.Parameters.Add("@addressLine2", SqlDbType.NVarChar).Value = cls.addressLine2 == null || string.IsNullOrEmpty(cls.addressLine2.Trim()) ? (object)DBNull.Value : cls.addressLine2.Trim();
                        cmd.Parameters.Add("@city", SqlDbType.Char).Value = cls.city.Trim();
                        cmd.Parameters.Add("@contactNo", SqlDbType.BigInt).Value = cls.contactNo;
                        cmd.Parameters.Add("@updateBy", SqlDbType.Int).Value = cls.updateBy;
                        cmd.Parameters.Add("@recordId", SqlDbType.Int).Value = cls.Id;


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
        [Route("getAllUsers")]
        public JsonResult GetAllUsers([FromBody] SafeLABS_models cls)
        {
            try
            {
                SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration));

                try
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("getAllUsers", con);
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
        [Route("getUserAttendanceCount")]
        public JsonResult GetUserAttendanceCount([FromBody] SafeLABS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
            
                    using (SqlCommand cmd = new SqlCommand("GetUserAttendanceCount", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Pass UserId as parameter
                        cmd.Parameters.Add("@userId", SqlDbType.Int).Value = cls.userId;

                        SqlDataReader dr = cmd.ExecuteReader();
                        DataTable dt = new DataTable();
                        dt.Load(dr);
                        dr.Close();

                        return new JsonResult(dt);
                    }
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = ex.Message, Details = "Error retrieving attendance count" });
            }
        }

       
        [HttpPost]
        [Route("checkPassword")]
        public JsonResult CheckPassword(SafeLABS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("checkPassword", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        
                        // Add the parameters to the command
                        string passwordOld = cls.currentPassword.Trim();
                        string currentPassword = Kripta.Encrypt(passwordOld, "SLpassSha@#$%-=.Pas").ToString().Trim();
                        //string currentPassword = passwordOld.ToString().Trim();
                        cmd.Parameters.Add("@currentPassword", SqlDbType.NVarChar).Value = passwordOld; 

                        cmd.Parameters.Add("@userId", SqlDbType.Int).Value = cls.Id;

                        // Execute the stored procedure and get the result
                        object result = cmd.ExecuteScalar();

                        if (result != null && result.ToString() == "EQUAL")
                        {
                            cls.PasswordCheckResult = "EQUAL";
                            return new JsonResult("EQUAL");
                        }
                        else
                        {
                            cls.PasswordCheckResult = "NOT EQUAL";
                            return new JsonResult("NOT EQUAL");
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
        [Route("updatePassword")]
        public JsonResult UpdatePassword(SafeLABS_models cls)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(AuthClass.Getconstring(_configuration)))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("updatePassword", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;



                        string passwordOld = cls.currentPassword.Trim();
                        string currentPassword = Kripta.Encrypt(passwordOld, "SLpassSha@#$%-=.Pas").ToString().Trim();
                        //string currentPassword = passwordOld.ToString().Trim();
                        cmd.Parameters.Add("@currentPassword", SqlDbType.NVarChar).Value = passwordOld;

                        string password = cls.newPassword.Trim();
                        string newPassword = Kripta.Encrypt(password, "SLpassSha@#$%-=.Pas").ToString().Trim();
                        cmd.Parameters.Add("@newPassword", SqlDbType.NVarChar).Value = newPassword;

                        cmd.Parameters.Add("@Id", SqlDbType.Int).Value = cls.Id;

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