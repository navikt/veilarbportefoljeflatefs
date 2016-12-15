package no.nav.fo.veilarbportefoljeflatefs.provider.sikkerhet;

import no.nav.modig.core.context.SubjectHandler;
import no.nav.modig.core.exception.AuthorizationException;
import org.apache.commons.codec.binary.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import static java.util.Optional.ofNullable;

/**
 * Klasse som håndterer XSRF tokens
 */
public class XsrfUtils {

    public static final String SESSION_UUID_ID = "xsrfuuid";

    private static final String SECRET = "871128f0-558f-4c88-acee-466a48bb5e95";

    public static String genererXsrfToken(HttpSession session) {
        String sessionUUID = (String) ofNullable(session.getAttribute(SESSION_UUID_ID)).orElse(UUID.randomUUID().toString());
        session.setAttribute(SESSION_UUID_ID, sessionUUID);
        return genererXsrfToken(sessionUUID);
    }

    private static String genererXsrfToken(String sessionUUID) {
        try {
            String signKey = SubjectHandler.getSubjectHandler().getEksternSsoToken() + sessionUUID;
            Mac hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(SECRET.getBytes(), "HmacSHA256");
            hmac.init(secretKey);
            return Base64.encodeBase64URLSafeString(hmac.doFinal(signKey.getBytes()));
        } catch (InvalidKeyException | NoSuchAlgorithmException e) {
            throw new RuntimeException("Kunne ikke generere token: ", e);
        }
    }

    public static void sjekkXsrfToken(String givenToken, HttpSession session) {
        String token = genererXsrfToken((String) session.getAttribute(SESSION_UUID_ID));
        if (!token.equals(givenToken)) {
            throw new AuthorizationException("XSRF sjekk feilet: Feil token");
        }
    }

    public static Cookie xsrfCookie(HttpSession session) {
        Cookie xsrfCookie = new Cookie("XSRF-TOKEN-xmlstilling-admin", genererXsrfToken(session));
        xsrfCookie.setPath(session.getServletContext().getContextPath());
        xsrfCookie.setMaxAge(-1);
        xsrfCookie.setSecure(true);
        return xsrfCookie;
    }
}
