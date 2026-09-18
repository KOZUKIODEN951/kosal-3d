// Custom GLSL Shaders for Kosal Iridescent Liquid Chrome Artifact

export const LiquidVertexShader = `
  uniform float uTime;
  uniform float uDistort;
  uniform float uFrequency;
  uniform vec2 uMouse;
  uniform float uScrollProgress;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  // Simplex 3D noise functions
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    // Mouse influence vector in 3D
    vec3 mouseWorld = vec3(uMouse * 1.5, 0.5);
    float distToMouse = length(position - mouseWorld);
    float mouseWave = sin(distToMouse * 4.0 - uTime * 3.0) * 0.12 * exp(-distToMouse * 0.8);

    // Multi-octave organic liquid noise displacement
    float noise1 = snoise(position * uFrequency + vec3(0.0, 0.0, uTime * 0.35));
    float noise2 = snoise(position * (uFrequency * 2.2) - vec3(uTime * 0.2, 0.0, 0.0)) * 0.5;
    
    float totalDisplacement = (noise1 + noise2) * uDistort + mouseWave;
    
    // Add scroll warp
    totalDisplacement += sin(position.y * 3.0 + uScrollProgress * 6.28) * (0.08 * uDistort);

    vDisplacement = totalDisplacement;
    vec3 newPos = position + normal * totalDisplacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

export const LiquidFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorBase;
  uniform vec3 uColorAccent;
  uniform vec3 uColorHighlight;
  uniform float uRoughness;
  uniform float uScrollProgress;
  uniform float uThemeLight; // 0.0 = dark, 1.0 = light

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(-vPosition);

    // Fresnel Rim Glow
    float fresnel = dot(normal, viewDir);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    float fresnelPow = pow(fresnel, 2.5);

    // Iridescent chromatic dispersion based on angle & displacement
    float angleFactor = dot(normal, vec3(0.0, 1.0, 0.5));
    vec3 colA = mix(uColorBase, uColorAccent, sin(angleFactor * 3.14 + vDisplacement * 4.0 + uTime * 0.5) * 0.5 + 0.5);
    vec3 colB = mix(colA, uColorHighlight, fresnelPow);

    // Specular highlight
    vec3 lightDir = normalize(vec3(1.2, 2.0, 1.5));
    vec3 halfVec = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfVec), 0.0), 32.0);
    vec3 specularColor = vec3(1.0, 1.0, 1.0) * spec * 0.9;

    // Ambient reflection
    vec3 finalColor = colB + specularColor;

    // Theme adjustment
    if (uThemeLight > 0.5) {
      // Light mode: softer pearl with high-contrast electric blue edge
      finalColor = mix(vec3(0.92, 0.94, 0.98), finalColor * 0.85, fresnelPow * 0.9 + 0.1);
    }

    // Alpha with edge glow
    float alpha = clamp(0.85 + fresnelPow * 0.15, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;
