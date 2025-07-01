package inventory.management.qa.server.exception;

import java.io.Serial;

public class EntityNotFoundException extends RuntimeException {

    @Serial private static final long serialVersionUID = 1L;

    public EntityNotFoundException(String msg) {
        super(msg);
    }
}
