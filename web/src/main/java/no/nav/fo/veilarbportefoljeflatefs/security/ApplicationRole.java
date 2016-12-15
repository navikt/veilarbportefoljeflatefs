package no.nav.fo.veilarbportefoljeflatefs.security;

import org.springframework.security.core.GrantedAuthority;


public enum ApplicationRole implements GrantedAuthority {
    ROLE_ADMIN, ROLE_LESETILGANG, ROLE_USER;

    @Override
    public String getAuthority() {
        return name();
    }

    @Override
    public String toString() {
        return name();
    }

}