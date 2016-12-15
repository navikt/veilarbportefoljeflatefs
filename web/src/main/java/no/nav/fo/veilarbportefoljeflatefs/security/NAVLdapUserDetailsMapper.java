package no.nav.fo.veilarbportefoljeflatefs.security;

import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.security.ldap.userdetails.LdapUserDetailsMapper;

import java.util.Collection;


public class NAVLdapUserDetailsMapper extends LdapUserDetailsMapper {

    private static final String SURNAME_ATTRIBUTE = "sn";
    private static final String GIVEN_NAME_ATTRIBUTE = "givenName";

    private static final String SERVICE_USER_DISPLAY_NAME= "Service User";


    @Override
    public UserDetails mapUserFromContext(DirContextOperations ctx, String username, Collection<? extends GrantedAuthority> authorities) {
        LdapUserDetailsImpl.Essence p = new LdapUserDetailsImpl.Essence(ctx);
        p.setUsername(username);
        p.setAuthorities(authorities);
        p.setDn(getDisplayName(ctx));
        return p.createUserDetails();

    }

    private String getDisplayName(DirContextOperations ctx){
        if (ctx.attributeExists(GIVEN_NAME_ATTRIBUTE) && ctx.attributeExists(SURNAME_ATTRIBUTE)){
           return ctx.getStringAttributes(GIVEN_NAME_ATTRIBUTE)[0] + " " + ctx.getStringAttributes(SURNAME_ATTRIBUTE)[0];
        }else{
            return SERVICE_USER_DISPLAY_NAME;
        }
    }

}



