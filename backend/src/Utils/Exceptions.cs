namespace StoreManager.API.Utils;


public class BusinessException : Exception
{
    public BusinessException(string message) : base(message) { }
}


public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) { }
}

public class ConflictException : Exception
{
    public ConflictException(string message) : base(message) { }
}
