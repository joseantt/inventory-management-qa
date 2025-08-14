package inventory.management.qa.server.configs;

import inventory.management.qa.server.entities.RevisionInfo;
import org.hibernate.envers.RevisionListener;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class CustomRevisionListener implements RevisionListener {

    @Override
    public void newRevision(Object revisionEntity) {
        RevisionInfo revisionInfo = (RevisionInfo) revisionEntity;

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (authentication != null && authentication.isAuthenticated())
                ? authentication.getName()
                : "unknown_email";

        revisionInfo.setUserEmail(email);
    }
}
