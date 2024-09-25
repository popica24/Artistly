namespace Domain.Responses;

public class InternalResponse
{
    public ResponseCode StatusCode { get; set; }
    public object? Data { get; set; }
    public string? Message { get; set; }
    public string? Title { get; set; }

    public InternalResponse()
    {
        
    }

    public InternalResponse(Exception ex)
    {
        StatusCode = ResponseCode.InternalServerError;
        Message = ex.Message;
        Title = ex.Source;
    }
}
