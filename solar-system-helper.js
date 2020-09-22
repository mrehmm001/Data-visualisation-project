function AngleClass(){
    this.degreeFromRadian=180/PI;
    this.radiansFromDegree=PI/180;
    
    this.cosDeg=function(degrees){
        return cos(this.radiansFromDegree*degrees);
    }

    this.sinDeg=function(degrees){
        return sin(this.radiansFromDegree*degrees);
    }
    this.AtanDeg2=function(x,y){
        return this.degreeFromRadian*Math.atan2(x,y);
    }
}


function PlanetPS (     
    N0, Nc, 
    i0, ic,   
    w0, wc,    
    a0, ac,    
    e0, ec,   
    M0, Mc,    
    magBase,
    magPhaseFactor,
    magNonlinearFactor,
    magNonlinearExponent )
{
    var angle= new AngleClass();
    this.BodyType = 'planet';
    this.N0 = N0;
    this.Nc = Nc;
    this.i0 = i0;
    this.ic = ic;
    this.w0 = w0;
    this.wc = wc;
    this.a0 = a0;
    this.ac = ac;
    this.e0 = e0;
    this.ec = ec;
    this.M0 = M0;
    this.Mc = Mc;
    this.magBase = magBase;
    this.magPhaseFactor = magPhaseFactor;
    this.magNonlinearFactor = magNonlinearFactor;
    this.magNonlinearExponent = magNonlinearExponent;
}

PlanetPS.prototype.plotCartesianCoords=function(day){
    var angle= new AngleClass();
    var a = this.a0 + (day * this.ac);
    var e = this.e0 + (day * this.ec);
    var M = this.M0 + (day * this.Mc);
    var N = this.N0 + (day * this.Nc);
    var w = this.w0 + (day * this.wc);
    var i = this.i0 + (day * this.ic);
    var E = EccentricAnomaly (e, M);
    a=(a*149597871/10000000)+10;
    
    // Calculate the body's position in its own orbital plane, and its distance from the thing it is orbiting.
    var xv = a * (angle.cosDeg(E) - e);
    var yv = a * (sqrt(1.0 - e*e) * angle.sinDeg(E));
    
    var v = angle.AtanDeg2 (yv, xv);        // True anomaly in degrees: the angle from perihelion of the body as seen by the Sun.
    var r = sqrt(xv*xv + yv*yv);      // Distance from the Sun to the planet in AU

    var cosN  = angle.cosDeg(N);
    var sinN  = angle.sinDeg(N);
    var cosi  = angle.cosDeg(i);
    var sini  = angle.sinDeg(i);
    var cosVW = angle.cosDeg(v + w);
    var sinVW = angle.sinDeg(v + w);

    // Now we are ready to calculate (unperturbed) ecliptic cartesian heliocentric coordinates.
    var xh = r * (cosN*cosVW - sinN*sinVW*cosi);
    var yh = r * (sinN*cosVW + cosN*sinVW*cosi);
    var zh = r * sinVW * sini;

    return {x:xh,y:yh,z:zh};
}

function EccentricAnomaly (e, M)
{
    var angle= new AngleClass();
    var E = M + (e * angle.sinDeg(M) * (1.0 + (e * angle.cosDeg(M))));
    while(true) {
        var F = E - (E - ((180/PI) * e * angle.sinDeg(E)) - M) / (1 - e * angle.cosDeg(E));
        var error = abs(F - E);
        E = F;
        if (error < 1.0e-8) {
            break;  // the angle is good enough now for our purposes
        }
    }

    return E;
}


function findGeoCentricPosition(day){
    var angle= new AngleClass();
    var d = day - 1.5;
        var T = d / 36525.0;                     // Julian centuries since J2000.0
        var L0 = 280.46645 + (36000.76983 * T) + (0.0003032 * T * T);      // Sun's mean longitude, in degrees
        var M0 = 357.52910 + (35999.05030 * T) - (0.0001559 * T * T) - (0.00000048 * T * T * T);      // Sun's mean anomaly, in degrees

        var C =       // Sun's equation of center in degrees
            (1.914600 - 0.004817 * T - 0.000014 * T * T) * angle.sinDeg (M0) +
            (0.01993 - 0.000101 * T) * angle.sinDeg (2 * M0) +
            0.000290 * angle.sinDeg (3 * M0)
        ;

        var LS = L0 + C;         // true ecliptical longitude of Sun

        var e = 0.016708617 - T * (0.000042037 + (0.0000001236 * T));    // The eccentricity of the Earth's orbit.
        var a = (1.000001018 * (1 - e * e)) / (1 + e * angle.cosDeg(M0 + C));     // distance from Sun to Earth in astronomical units (AU)
        a=(a*149597871/10000000)+10;
        var x = -a * angle.cosDeg (LS);
        var y = -a * angle.sinDeg (LS);
        return {x:x, y:y, z:0.0};      // the Earth's center is always on the plane of the ecliptic (z=0), by definition!


}

