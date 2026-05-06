package com.meetzen.backend.infra.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtProvider {

    private final java.security.PrivateKey privateKey;
    private final java.security.PublicKey publicKey;

    @Value("${jwt.expiration.seconds:900}")
    private long expirationSeconds;

    public JwtProvider(@Value("${jwt.private-key:}") String base64PrivateKey) throws Exception {
        if (base64PrivateKey == null || base64PrivateKey.isBlank()) {
            // generate ephemeral key for dev if none provided
            var kp = Keys.keyPairFor(SignatureAlgorithm.RS256);
            this.privateKey = kp.getPrivate();
            this.publicKey = kp.getPublic();
        } else {
            byte[] keyBytes = Base64.getDecoder().decode(base64PrivateKey);
            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
            KeyFactory kf = KeyFactory.getInstance("RSA");
            this.privateKey = kf.generatePrivate(spec);
            // derive public key from private (not straightforward) - for production provide both or use keystore
            this.publicKey = null;
        }
    }

    public String createToken(Long userId, String email) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(expirationSeconds)))
                .addClaims(Map.of("email", email))
                .signWith(privateKey, SignatureAlgorithm.RS256)
                .compact();
    }

    public java.security.PublicKey publicKey() {
        return publicKey;
    }
}
